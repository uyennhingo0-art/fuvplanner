import { useState } from 'react';
import { RequirementBlock } from '../components/RequirementBlock';
import { FlowchartNode } from '../components/FlowchartNode';

export function MajorPage() {
  const [viewMode, setViewMode] = useState<'requirements' | 'flowchart'>('requirements');

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-4">Major Requirements</h1>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setViewMode('requirements')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            viewMode === 'requirements'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Requirements
        </button>
        <button
          onClick={() => setViewMode('flowchart')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            viewMode === 'flowchart'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Flowchart
        </button>
      </div>

      {viewMode === 'requirements' ? (
        <div className="space-y-6">
          <RequirementBlock
            title="Foundation Courses"
            requiredCredits={8}
            completedCredits={8}
            description="Introductory courses providing fundamental knowledge"
            rules={['Complete all foundation before intermediate', 'Minimum grade C required']}
            defaultExpanded
          />

          <RequirementBlock
            title="Intermediate Courses"
            requiredCredits={16}
            completedCredits={4}
            description="Core courses building depth in the major"
            rules={['Must complete foundation first', 'At least 4 different courses']}
          />

          <RequirementBlock
            title="Advanced Courses"
            requiredCredits={16}
            completedCredits={0}
            description="Specialized courses for advanced study"
            rules={['Complete intermediate first', 'At least 4 courses at 300-level']}
          />

          <RequirementBlock
            title="Major Electives"
            requiredCredits={8}
            completedCredits={0}
            description="Additional courses to customize your major"
            rules={['Choose from approved list', 'At least one 300-level']}
          />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="overflow-x-auto">
            <div className="inline-flex gap-8 pb-4">
              <div>
                <h3 className="font-semibold mb-3">Foundation</h3>
                <div className="space-y-2">
                  <FlowchartNode code="CS 101" title="Intro to CS" level="foundation" credits={4} status="completed" />
                  <FlowchartNode code="CS 150" title="Discrete Math" level="foundation" credits={4} status="completed" />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Intermediate</h3>
                <div className="space-y-2">
                  <FlowchartNode code="CS 201" title="Data Structures" level="intermediate" credits={4} status="in_progress" />
                  <FlowchartNode code="CS 220" title="Architecture" level="intermediate" credits={4} />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Advanced</h3>
                <div className="space-y-2">
                  <FlowchartNode code="CS 301" title="AI" level="advanced" credits={4} />
                  <FlowchartNode code="CS 320" title="Databases" level="advanced" credits={4} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-secondary bg-opacity-30 rounded-lg p-6">
        <h3 className="font-semibold text-primary mb-2">Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div><p className="text-gray-600">Required</p><p className="text-xl font-bold text-primary">48</p></div>
          <div><p className="text-gray-600">Completed</p><p className="text-xl font-bold text-green-600">12</p></div>
          <div><p className="text-gray-600">In Progress</p><p className="text-xl font-bold text-yellow-600">8</p></div>
          <div><p className="text-gray-600">Remaining</p><p className="text-xl font-bold text-gray-600">28</p></div>
          <div><p className="text-gray-600">300-Level</p><p className="text-xl font-bold text-primary">0/8</p></div>
        </div>
      </div>
    </div>
  );
}
