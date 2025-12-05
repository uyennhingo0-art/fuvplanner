import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';

interface MilestoneItem {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

interface CapstoneCardProps {
  title: string;
  advisor?: string;
  status: 'planning' | 'capstone_1' | 'capstone_2' | 'completed';
  irbRequired: boolean;
  irbStatus?: string;
  milestones: MilestoneItem[];
}

export function CapstoneCard({
  title,
  advisor,
  status,
  irbRequired,
  irbStatus,
  milestones,
}: CapstoneCardProps) {
  const statusLabels = {
    planning: 'Planning Phase',
    capstone_1: 'Capstone I',
    capstone_2: 'Capstone II',
    completed: 'Completed',
  };

  const statusColors = {
    planning: 'bg-gray-100 text-gray-800',
    capstone_1: 'bg-blue-100 text-blue-800',
    capstone_2: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
  };

  const completedMilestones = milestones.filter((m) => m.completed).length;
  const progress = (completedMilestones / milestones.length) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
              {statusLabels[status]}
            </span>
          </div>
          {advisor && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Advisor:</span> {advisor}
            </p>
          )}
        </div>
      </div>

      {irbRequired && (
        <div className={`mb-4 p-3 rounded-lg ${irbStatus === 'approved' ? 'bg-green-50' : 'bg-yellow-50'}`}>
          <div className="flex items-center gap-2">
            <AlertCircle className={`w-4 h-4 ${irbStatus === 'approved' ? 'text-green-600' : 'text-yellow-600'}`} />
            <span className={`text-sm font-medium ${irbStatus === 'approved' ? 'text-green-800' : 'text-yellow-800'}`}>
              IRB Approval {irbStatus ? `(${irbStatus})` : 'Required'}
            </span>
          </div>
        </div>
      )}

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-600">
            {completedMilestones}/{milestones.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Milestones</h4>
        <div className="space-y-2">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-start gap-3">
              {milestone.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`text-sm ${milestone.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                  {milestone.title}
                </p>
                {milestone.dueDate && (
                  <p className="text-xs text-gray-500 mt-1">{milestone.dueDate}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
