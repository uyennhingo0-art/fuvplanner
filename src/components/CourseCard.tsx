import { Course } from '../types/academics';

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  const statusColors = {
    planned: 'bg-gray-400',
    in_progress: 'bg-yellow-400',
    completed: 'bg-green-500',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{course.courseCode}</h3>
            {course.status && (
              <div className={`w-2 h-2 rounded-full ${statusColors[course.status]}`} />
            )}
          </div>
          <p className="text-sm text-gray-600 mb-2">{course.title}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800`}>
            {course.level}-level
          </span>
          <span className="text-sm font-semibold text-primary">{course.credits} cr</span>
        </div>
      </div>
      {course.grade && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">Grade: </span>
          <span className="text-sm font-semibold text-gray-900">{course.grade}</span>
        </div>
      )}
    </div>
  );
}
