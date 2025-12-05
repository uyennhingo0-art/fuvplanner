import { useMemo, useState } from 'react';
import { updateCourseStatus, recordGrade, loadStudentData } from '../api/dataStore';
import { Course } from '../types/academics';

const gradeOptions = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F', 'P', 'NP'];

export function CorePage() {
  const [refreshIndex, setRefreshIndex] = useState(0);
  const data = useMemo(() => loadStudentData(), [refreshIndex]);
  const coreCourses = data.courses.filter((course) => course.categories.includes('core'));

  const handleStatusChange = (course: Course, status: Course['status']) => {
    updateCourseStatus(course.id, status);
    setRefreshIndex((value) => value + 1);
  };

  const handleGradeChange = (course: Course, grade: Course['grade']) => {
    recordGrade(course.id, grade);
    setRefreshIndex((value) => value + 1);
  };

  const completedCredits = coreCourses
    .filter((course) => course.status === 'completed')
    .reduce((sum, course) => sum + course.credits, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-2">Core Curriculum</h1>
      <p className="text-gray-600 mb-6">
        Track your core curriculum progress and update statuses or grades as you complete each course.
      </p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Completed Core Credits</p>
            <p className="text-2xl font-bold text-primary">{completedCredits} / 16</p>
          </div>
          <button
            onClick={() => setRefreshIndex((value) => value + 1)}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-900"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {coreCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-gray-900">{course.courseCode}</p>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{course.credits} cr</span>
              </div>
              <p className="text-sm text-gray-700">{course.title}</p>
              <p className="text-xs text-gray-500">
                {course.term} {course.year} · {course.instructor ?? 'TBD'}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <label className="text-xs text-gray-600">Status</label>
              <select
                value={course.status}
                onChange={(e) => handleStatusChange(course, e.target.value as Course['status'])}
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value="planned">Planned</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <label className="text-xs text-gray-600">Grade</label>
              <select
                value={course.grade ?? ''}
                onChange={(e) => handleGradeChange(course, (e.target.value || null) as Course['grade'])}
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Not set</option>
                {gradeOptions.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
