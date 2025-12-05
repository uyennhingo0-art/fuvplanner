import { useMemo, useState } from 'react';
import { CircularProgress, ProgressBar } from '../components/ProgressBar';
import { AlertBanner } from '../components/AlertBanner';
import { computeAcademicProgress } from '../api/requirements';
import { loadStudentData } from '../api/dataStore';

export function ProgressPage() {
  const [refreshIndex, setRefreshIndex] = useState(0);
  const data = useMemo(() => loadStudentData(), [refreshIndex]);
  const summary = useMemo(
    () => computeAcademicProgress(data.courses, data.profile),
    [data]
  );

  const requirementRows = [
    { category: 'Core Curriculum', result: summary.core },
    { category: 'Exploratory', result: summary.exploratory },
    { category: 'Major Requirements', result: summary.major },
    summary.minor ? { category: 'Minor Requirements', result: summary.minor } : null,
    { category: 'ELP', result: summary.elp },
  ].filter(Boolean) as { category: string; result: typeof summary.core }[];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col gap-2 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-primary">Progress Dashboard</h1>
        <button
          onClick={() => setRefreshIndex((value) => value + 1)}
          className="px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
        >
          Refresh data
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center">
          <CircularProgress current={summary.totalCredits} total={summary.totalRequirement} size={180} />
          <h2 className="text-lg font-semibold text-gray-900 mt-4 mb-1">Total Credits</h2>
          <p className="text-sm text-gray-600">
            {Math.min(100, Math.round((summary.totalCredits / summary.totalRequirement) * 100))}% Complete
          </p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">Current GPA</p>
            <p className="text-4xl font-bold text-primary mb-1">{summary.gpa ?? 'N/A'}</p>
            <p className="text-xs text-gray-500">{summary.gradedCourseCount} graded courses</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">Courses</p>
            <p className="text-4xl font-bold text-primary mb-1">{summary.courseCount}</p>
            <p className="text-xs text-gray-500">Across all requirements</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">300-Level Credits</p>
            <p className="text-4xl font-bold text-primary mb-1">{summary.major.upperLevel}</p>
            <p className="text-xs text-gray-500">Major double counted: {summary.major.doubleCounted} credits</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">Capstone Eligibility</p>
            <p className={`text-lg font-semibold ${summary.capstoneEligible ? 'text-green-600' : 'text-orange-600'}`}>
              {summary.capstoneEligible ? 'Eligible' : 'Not yet eligible'}
            </p>
            <p className="text-xs text-gray-500">Requires 80+ credits and 32+ major credits</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirement Progress</h2>
        <div className="space-y-4">
          {requirementRows.map((req) => (
            <div key={req.category}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{req.category}</span>
                <span className="text-sm text-gray-600">
                  {req.result.completed}/{req.result.required} credits
                </span>
              </div>
              <ProgressBar current={req.result.completed} total={req.result.required} height="md" />
              {req.result.notes && req.result.notes.length > 0 && (
                <ul className="mt-2 list-disc list-inside text-xs text-gray-600 space-y-1">
                  {req.result.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Exploratory Breakdown</h3>
          {Object.entries(summary.exploratory.areaCredits).map(([area, credits]) => (
            <div key={area} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{area}</span>
              <span className="text-sm font-medium text-gray-900">{credits} credits</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Alerts</h3>
          {requirementRows.every((req) => req.result.status === 'complete') ? (
            <AlertBanner type="success" message="All tracked requirements are complete." />
          ) : (
            <div className="space-y-3">
              {summary.exploratory.notes?.map((note) => (
                <AlertBanner key={note} type="warning" message={note} dismissible />
              ))}
              {!summary.capstoneEligible && (
                <AlertBanner
                  type="info"
                  message="Capstone eligibility requires 80 credits completed and strong major progress."
                  dismissible
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
