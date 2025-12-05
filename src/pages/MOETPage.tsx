import { useMemo, useState } from 'react';
import { RequirementBlock } from '../components/RequirementBlock';
import { AlertBanner } from '../components/AlertBanner';
import { Course } from '../types/academics';
import { loadStudentData, updateCourseStatus, recordGrade } from '../api/dataStore';

const gradeOptions = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F', 'P', 'NP'];

export function MOETPage() {
  const [refreshIndex, setRefreshIndex] = useState(0);
  const data = useMemo(() => loadStudentData(), [refreshIndex]);
  const moetCourses = data.courses.filter((course) => course.categories.includes('moet'));

  const handleStatusChange = (course: Course, status: Course['status']) => {
    updateCourseStatus(course.id, status);
    setRefreshIndex((value) => value + 1);
  };

  const handleGradeChange = (course: Course, grade: Course['grade']) => {
    recordGrade(course.id, grade);
    setRefreshIndex((value) => value + 1);
  };

  const politicalCourses = moetCourses;

  const militaryModules = [
    { id: 1, name: 'Military History & Theory', completed: true, hours: 30 },
    { id: 2, name: 'Military Training (Basic)', completed: true, hours: 20 },
    { id: 3, name: 'Defense & National Security', completed: false, hours: 20 },
    { id: 4, name: 'Military Tactics Workshop', completed: false, hours: 15 },
  ];

  const peModules = [
    { id: 1, name: 'Physical Fitness', completed: true, hours: 30 },
    { id: 2, name: 'Traditional Sports', completed: false, hours: 15 },
    { id: 3, name: 'Combat Sports Training', completed: false, hours: 15 },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">MOET Requirements</h1>
        <p className="text-gray-600 mb-4">
          Ministry of Education and Training (MOET) compulsory requirements for Vietnamese students
        </p>
        <AlertBanner
          type="info"
          message="These requirements do not count toward your 128-credit degree. They are separate and mandatory for Vietnamese citizens."
          dismissible
        />
      </div>

      <div className="space-y-6">
        <RequirementBlock
          title="Political Theory Courses"
          requiredCredits={6}
          completedCredits={politicalCourses
            .filter((c) => c.status === 'completed')
            .reduce((sum, c) => sum + c.credits, 0)}
          description="Study Vietnamese history, governance, and political ideology"
          rules={[
            'These hours/credits do not count toward the 128-credit degree',
            'Good to track completion for graduation clearance',
          ]}
          defaultExpanded
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {politicalCourses.map((course) => (
              <div key={course.id} className="p-3 rounded-lg border border-gray-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{course.courseCode}</p>
                    <p className="text-sm text-gray-600">{course.title}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">{course.credits} cr</span>
                </div>
                <div className="flex gap-2 items-center text-sm">
                  <label className="text-xs text-gray-600">Status</label>
                  <select
                    value={course.status}
                    onChange={(e) => handleStatusChange(course, e.target.value as Course['status'])}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="planned">Planned</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="flex gap-2 items-center text-sm">
                  <label className="text-xs text-gray-600">Grade</label>
                  <select
                    value={course.grade ?? ''}
                    onChange={(e) => handleGradeChange(course, (e.target.value || null) as Course['grade'])}
                    className="border rounded px-2 py-1 text-sm"
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
        </RequirementBlock>

        <RequirementBlock
          title="Military Training"
          requiredCredits={85}
          completedCredits={50}
          description="Comprehensive military training including history, theory, and practical exercises"
          rules={[
            'Total of 85+ hours required',
            'Must include both theoretical and practical components',
            'Basic training is mandatory',
            'Can be completed over multiple semesters',
          ]}
        >
          <div className="space-y-3">
            {militaryModules.map((module) => (
              <div
                key={module.id}
                className={`p-4 rounded-lg border ${
                  module.completed ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{module.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{module.hours} hours</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      module.completed ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {module.completed ? 'Completed' : 'Pending'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-secondary bg-opacity-20 rounded-lg border border-secondary">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Note:</span> Military training is typically conducted by the university's
              military department. Schedule sessions through the student affairs office.
            </p>
          </div>
        </RequirementBlock>

        <RequirementBlock
          title="Physical Education"
          requiredCredits={60}
          completedCredits={30}
          description="Physical fitness and sports training for health and wellness"
          rules={[
            'Total of 60+ hours required',
            'Includes traditional Vietnamese sports and modern fitness',
            'Can include combat sports or dance',
            'Flexible scheduling available',
          ]}
        >
          <div className="space-y-3">
            {peModules.map((module) => (
              <div
                key={module.id}
                className={`p-4 rounded-lg border ${
                  module.completed ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{module.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{module.hours} hours</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      module.completed ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {module.completed ? 'Completed' : 'Pending'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-secondary bg-opacity-20 rounded-lg border border-secondary">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Sports Options:</span> Badminton, Basketball, Volleyball, Traditional Martial
              Arts, Swimming, Aerobics, Dance
            </p>
          </div>
        </RequirementBlock>
      </div>
    </div>
  );
}
