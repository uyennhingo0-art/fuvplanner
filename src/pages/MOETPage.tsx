import { RequirementBlock } from '../components/RequirementBlock';
import { AlertBanner } from '../components/AlertBanner';
import { CourseCard } from '../components/CourseCard';
import { Course } from '../types';

export function MOETPage() {
  const politicalCourses: Course[] = [
    {
      id: 'moet1',
      code: 'POL 101',
      title: 'Introduction to Vietnamese Politics',
      credits: 2,
      level: 'foundation',
      category: 'moet',
      prerequisites: [],
      status: 'completed',
      grade: 'A',
    },
    {
      id: 'moet2',
      code: 'POL 102',
      title: 'History of Vietnamese Communist Party',
      credits: 2,
      level: 'foundation',
      category: 'moet',
      prerequisites: [],
      status: 'completed',
      grade: 'B+',
    },
    {
      id: 'moet3',
      code: 'POL 103',
      title: 'Constitutional Law',
      credits: 2,
      level: 'foundation',
      category: 'moet',
      prerequisites: [],
      status: 'in_progress',
    },
  ];

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
          completedCredits={4}
          description="Study Vietnamese history, governance, and political ideology"
          rules={[
            'Complete at least 5 courses totaling 6+ credits',
            'Must include History of VCP',
            'Constitutional Law recommended',
            'Focus on Vietnamese governance and society',
          ]}
          defaultExpanded
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {politicalCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="mt-4 p-4 bg-secondary bg-opacity-20 rounded-lg border border-secondary">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Political Theory Electives</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• POL 104: International Relations</li>
              <li>• POL 105: Southeast Asian Politics</li>
              <li>• POL 106: Vietnamese Foreign Policy</li>
              <li>• SOC 201: Vietnamese Society</li>
            </ul>
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
                  module.completed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-yellow-50 border-yellow-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{module.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{module.hours} hours</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      module.completed
                        ? 'bg-green-200 text-green-800'
                        : 'bg-yellow-200 text-yellow-800'
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
              <span className="font-semibold">Note:</span> Military training is typically conducted by the
              university's military department. Schedule sessions through the student affairs office.
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
                  module.completed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-yellow-50 border-yellow-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{module.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{module.hours} hours</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      module.completed
                        ? 'bg-green-200 text-green-800'
                        : 'bg-yellow-200 text-yellow-800'
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
              <span className="font-semibold">Sports Options:</span> Badminton, Basketball, Volleyball,
              Traditional Martial Arts, Swimming, Aerobics, Dance
            </p>
          </div>
        </RequirementBlock>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-accent bg-opacity-10 rounded-lg p-6 border border-accent">
          <h3 className="font-semibold text-gray-900 mb-2">Political Courses</h3>
          <div className="text-3xl font-bold text-primary">4/6 cr</div>
          <p className="text-sm text-gray-600 mt-1">Completed - 2 credits remaining</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-2">Military Training</h3>
          <div className="text-3xl font-bold text-blue-600">50/85 hrs</div>
          <p className="text-sm text-gray-600 mt-1">In progress - 35 hours remaining</p>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="font-semibold text-gray-900 mb-2">Physical Education</h3>
          <div className="text-3xl font-bold text-green-600">30/60 hrs</div>
          <p className="text-sm text-gray-600 mt-1">In progress - 30 hours remaining</p>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Important Information</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="font-semibold text-primary flex-shrink-0">•</span>
            <span>MOET requirements are mandatory for all Vietnamese citizens and permanent residents</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold text-primary flex-shrink-0">•</span>
            <span>These credits/hours do not count toward your 128-credit degree requirement</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold text-primary flex-shrink-0">•</span>
            <span>International students may be exempt - check with International Student Office</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold text-primary flex-shrink-0">•</span>
            <span>Must be completed before graduation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold text-primary flex-shrink-0">•</span>
            <span>Contact Student Affairs for exemption requests or accommodations</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
