import { AlertBanner } from '../components/AlertBanner';
import { Clock } from 'lucide-react';

export function PlannerPage() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00'];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-2">Smart Semester Planner</h1>
      <p className="text-gray-600 mb-6">
        Plan your schedule with intelligent conflict detection and recommendations
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Total Credits</p>
          <p className="text-2xl font-bold text-primary">16</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Courses</p>
          <p className="text-2xl font-bold text-primary">4</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Conflicts</p>
          <p className="text-2xl font-bold text-green-600">0</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Issues</p>
          <p className="text-2xl font-bold text-green-600">0</p>
        </div>
      </div>

      <AlertBanner
        type="info"
        message="Drag courses to schedule them. The system will automatically detect conflicts."
        dismissible
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-semibold text-gray-900">Weekly Schedule</h2>
            </div>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                <div className="grid grid-cols-6 gap-0 border-b">
                  <div className="p-2 bg-gray-50"><Clock className="w-4 h-4 text-gray-400" /></div>
                  {days.map((day) => (
                    <div key={day} className="p-2 bg-gray-50 text-center text-sm font-semibold">
                      {day}
                    </div>
                  ))}
                </div>
                {timeSlots.map((time) => (
                  <div key={time} className="grid grid-cols-6 gap-0 border-b">
                    <div className="p-2 bg-gray-50 text-xs text-gray-600">{time}</div>
                    {days.map((day) => (
                      <div key={`${day}-${time}`} className="p-2 border-l bg-white min-h-[60px]" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Preferences</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-700">Morning classes only</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-700">3-day schedule</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-700">Balanced workload</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-700">Internship-friendly</span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Recommended</h3>
            <div className="space-y-2">
              {['CS 220', 'CS 250', 'MATH 250'].map((code) => (
                <div key={code} className="p-2 bg-gray-50 rounded hover:bg-gray-100">
                  <p className="text-sm font-medium text-gray-900">{code}</p>
                  <p className="text-xs text-gray-600">Add to schedule</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-accent bg-opacity-10 rounded-lg p-4 border border-accent">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">Course Insights</h3>
            <div className="space-y-2 text-xs text-gray-700">
              <div className="flex justify-between">
                <span>Avg difficulty:</span>
                <span className="font-semibold">Medium</span>
              </div>
              <div className="flex justify-between">
                <span>Workload:</span>
                <span className="font-semibold">12-15 hrs/week</span>
              </div>
              <div className="flex justify-between">
                <span>Balance:</span>
                <span className="font-semibold text-green-600">Good</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
