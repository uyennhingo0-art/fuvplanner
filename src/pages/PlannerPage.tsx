import { useMemo, useState } from 'react';
import { AlertBanner } from '../components/AlertBanner';
import { Clock } from 'lucide-react';
import { loadStudentData, updateCourseStatus } from '../api/dataStore';
import { Course } from '../types/academics';

export function PlannerPage() {
  const [refreshIndex, setRefreshIndex] = useState(0);
  const data = useMemo(() => loadStudentData(), [refreshIndex]);
  const plannedCourses = data.courses.filter((course) => course.status !== 'completed');
  const totalCredits = plannedCourses.reduce((sum, course) => sum + course.credits, 0);
  const lowLoad = totalCredits < 12;
  const overload = totalCredits > 20;

  const changeStatus = (course: Course, status: Course['status']) => {
    updateCourseStatus(course.id, status);
    setRefreshIndex((value) => value + 1);
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00'];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-2">Smart Semester Planner</h1>
      <p className="text-gray-600 mb-6">
        Plan your schedule with interactive status updates and credit load checks.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Total Credits</p>
          <p className="text-2xl font-bold text-primary">{totalCredits}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Courses</p>
          <p className="text-2xl font-bold text-primary">{plannedCourses.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Conflicts</p>
          <p className="text-2xl font-bold text-green-600">0</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Issues</p>
          <p className={`text-2xl font-bold ${overload || lowLoad ? 'text-orange-600' : 'text-green-600'}`}>
            {overload || lowLoad ? 1 : 0}
          </p>
        </div>
      </div>

      {(overload || lowLoad) && (
        <AlertBanner
          type={overload ? 'warning' : 'info'}
          message={overload ? 'Credit overload: please stay at or below 20 credits.' : 'Below 12 credits. Consider adding courses.'}
          dismissible
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-semibold text-gray-900">Weekly Schedule</h2>
            </div>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                <div className="grid grid-cols-6 gap-0 border-b">
                  <div className="p-2 bg-gray-50">
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
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
            <h3 className="font-semibold text-gray-900 mb-3">My Courses</h3>
            <div className="space-y-2">
              {plannedCourses.map((course) => (
                <div key={course.id} className="p-2 bg-gray-50 rounded border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{course.courseCode}</p>
                      <p className="text-xs text-gray-600">{course.title}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">{course.credits} cr</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <label className="text-gray-600">Status</label>
                    <select
                      value={course.status}
                      onChange={(e) => changeStatus(course, e.target.value as Course['status'])}
                      className="border rounded px-2 py-1 text-xs"
                    >
                      <option value="planned">Planned</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
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
                <span className={`font-semibold ${overload || lowLoad ? 'text-orange-600' : 'text-green-600'}`}>
                  {overload ? 'Overload' : lowLoad ? 'Light' : 'Good'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
