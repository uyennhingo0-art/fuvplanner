import { CircularProgress, ProgressBar } from '../components/ProgressBar';
import { AlertBanner } from '../components/AlertBanner';

export function ProgressPage() {
  const requirements = [
    { category: 'Core Curriculum', completed: 28, required: 28 },
    { category: 'Exploratory', completed: 16, required: 24 },
    { category: 'Major Requirements', completed: 20, required: 48 },
    { category: 'Minor Requirements', completed: 0, required: 20 },
    { category: 'Electives', completed: 0, required: 4 },
    { category: 'ELP', completed: 0, required: 4 },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6">Progress Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center">
          <CircularProgress current={64} total={128} size={180} />
          <h2 className="text-lg font-semibold text-gray-900 mt-4 mb-1">Total Credits</h2>
          <p className="text-sm text-gray-600">50% Complete</p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">Current GPA</p>
            <p className="text-4xl font-bold text-primary mb-1">3.67</p>
            <p className="text-xs text-green-600">+0.12 from last</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">Courses</p>
            <p className="text-4xl font-bold text-primary mb-1">18</p>
            <p className="text-xs text-gray-500">Out of ~32 total</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">Honors Track</p>
            <p className="text-lg font-semibold text-green-600 mb-1">On Track</p>
            <p className="text-xs text-gray-500">Maintain 3.5+ GPA</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">300-Level Courses</p>
            <p className="text-4xl font-bold text-primary mb-1">4</p>
            <p className="text-xs text-gray-500">Need 8 minimum</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirement Progress</h2>
        <div className="space-y-4">
          {requirements.map((req) => (
            <div key={req.category}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{req.category}</span>
                <span className="text-sm text-gray-600">
                  {req.completed}/{req.required} credits
                </span>
              </div>
              <ProgressBar current={req.completed} total={req.required} height="md" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-900">Alerts</h2>
        <AlertBanner
          type="warning"
          message="You need 8 more credits in E2 Social Sciences"
          dismissible
        />
        <AlertBanner
          type="info"
          message="You are eligible to start your Capstone project"
          dismissible
        />
      </div>
    </div>
  );
}
