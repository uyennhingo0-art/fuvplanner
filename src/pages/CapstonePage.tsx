import { CapstoneCard } from '../components/CapstoneCard';
import { AlertBanner } from '../components/AlertBanner';
import { CheckCircle2, Clock } from 'lucide-react';

export function CapstonePage() {
  const capstoneProject = {
    title: 'AI-Powered Educational Recommendation System',
    advisor: 'Dr. Minh Nguyen',
    status: 'capstone_1' as const,
    irbRequired: true,
    irbStatus: 'approved' as const,
    milestones: [
      { id: '1', title: 'Finalize research proposal', completed: true },
      { id: '2', title: 'Literature review', completed: true },
      { id: '3', title: 'IRB approval', completed: true, dueDate: 'Approved Nov 15' },
      { id: '4', title: 'Develop prototype', completed: false, dueDate: 'Due Dec 20' },
      { id: '5', title: 'Collect initial data', completed: false, dueDate: 'Due Jan 31' },
      { id: '6', title: 'Write draft paper', completed: false, dueDate: 'Due Feb 28' },
    ],
  };

  const eligibilityRequirements = [
    { label: 'Total Credits Completed', value: 64, required: 80, met: false },
    { label: 'GPA Requirement', value: 3.67, required: 2.0, met: true },
    { label: 'Major Requirements', value: 12, required: 32, met: false },
    { label: 'No Academic Probation', value: 'Good Standing', required: 'Good Standing', met: true },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Capstone Project</h1>
        <p className="text-gray-600">
          Complete your capstone project to fulfill your degree requirements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <CapstoneCard
            title={capstoneProject.title}
            advisor={capstoneProject.advisor}
            status={capstoneProject.status}
            irbRequired={capstoneProject.irbRequired}
            irbStatus={capstoneProject.irbStatus}
            milestones={capstoneProject.milestones}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Timeline</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Planning Phase</p>
                <p className="text-xs text-gray-600">Aug - Oct 2024</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Capstone I</p>
                <p className="text-xs text-gray-600">Nov 2024 - Jan 2025</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600">Capstone II</p>
                <p className="text-xs text-gray-600">Feb - Apr 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Eligibility Checklist</h2>

        {eligibilityRequirements.some((r) => !r.met) && (
          <AlertBanner
            type="info"
            message="You need to complete 16 more credits before starting your capstone project. Plan your courses accordingly!"
            dismissible
          />
        )}

        <div className="mt-4 space-y-3">
          {eligibilityRequirements.map((req, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{req.label}</p>
                {typeof req.value === 'number' && typeof req.required === 'number' && (
                  <p className="text-sm text-gray-600">
                    {req.value}/{req.required}
                  </p>
                )}
              </div>
              {req.met ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Advisor Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium text-gray-900">Dr. Minh Nguyen</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">m.nguyen@fuv.edu.vn</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Office Hours</p>
              <p className="font-medium text-gray-900">Tue & Thu 2-4 PM</p>
            </div>
            <button className="w-full mt-3 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors">
              Schedule Meeting
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
          <div className="space-y-2">
            <a
              href="#"
              className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <p className="font-medium text-gray-900 text-sm">Capstone Guidelines</p>
              <p className="text-xs text-gray-600 mt-1">Full requirements and expectations</p>
            </a>
            <a
              href="#"
              className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <p className="font-medium text-gray-900 text-sm">IRB Application</p>
              <p className="text-xs text-gray-600 mt-1">If your project involves human subjects</p>
            </a>
            <a
              href="#"
              className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <p className="font-medium text-gray-900 text-sm">Writing Center</p>
              <p className="text-xs text-gray-600 mt-1">Get help with your capstone writing</p>
            </a>
            <a
              href="#"
              className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <p className="font-medium text-gray-900 text-sm">Research Database Access</p>
              <p className="text-xs text-gray-600 mt-1">Access library resources</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
