import { Users, MessageSquare, FileText, Calendar } from 'lucide-react';

interface StudyGroupCardProps {
  courseName: string;
  courseCode: string;
  groupName: string;
  memberCount: number;
  maxMembers: number;
  isJoined?: boolean;
  onJoin?: () => void;
}

export function StudyGroupCard({
  courseName,
  courseCode,
  groupName,
  memberCount,
  maxMembers,
  isJoined = false,
  onJoin,
}: StudyGroupCardProps) {
  const isFull = memberCount >= maxMembers;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="mb-3">
        <div className="text-xs font-medium text-gray-500 mb-1">{courseCode}</div>
        <h3 className="font-semibold text-gray-900">{groupName}</h3>
        <p className="text-sm text-gray-600 mt-1">{courseName}</p>
      </div>

      <div className="space-y-2 mb-4 py-3 border-t border-b border-gray-100">
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700">
            {memberCount}/{maxMembers} members
          </span>
          {isFull && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Full</span>}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MessageSquare className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">12 messages</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <FileText className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">5 files shared</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Next session Fri 2 PM</span>
        </div>
      </div>

      {isJoined ? (
        <button className="w-full bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors">
          Open Group
        </button>
      ) : (
        <button
          onClick={onJoin}
          disabled={isFull}
          className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
            isFull
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-secondary text-primary hover:bg-blue-200'
          }`}
        >
          {isFull ? 'Group Full' : 'Join Group'}
        </button>
      )}
    </div>
  );
}
