import { useMemo, useState } from 'react';
import { StudyGroupCard } from '../components/StudyGroupCard';
import { Search } from 'lucide-react';
import { joinStudyGroup, listStudyGroups } from '../api/dataStore';

export function StudyGroupsPage() {
  const [joinedGroups, setJoinedGroups] = useState(['sg-2']);
  const [searchTerm, setSearchTerm] = useState('');

  const groups = useMemo(() => listStudyGroups(), [joinedGroups.length]);

  const filteredGroups = groups.filter(
    (group) =>
      group.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoin = (groupId: string) => {
    joinStudyGroup(groupId);
    setJoinedGroups((prev) => (prev.includes(groupId) ? prev : [...prev, groupId]));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Study Groups</h1>
        <p className="text-gray-600">
          Join study groups for your courses and collaborate with classmates
        </p>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by course code, name, or group..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredGroups.map((group) => (
          <StudyGroupCard
            key={group.id}
            courseCode={group.courseCode}
            courseName={group.courseName}
            groupName={group.groupName}
            memberCount={group.memberCount}
            maxMembers={group.maxMembers}
            isJoined={joinedGroups.includes(group.id)}
            onJoin={() => handleJoin(group.id)}
          />
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-2">No study groups found</p>
          <p className="text-sm text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}

      {joinedGroups.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">My Study Groups</h2>
          <div className="space-y-3">
            {groups
              .filter((g) => joinedGroups.includes(g.id))
              .map((group) => (
                <div key={group.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">{group.groupName}</div>
                    <div className="text-sm text-gray-600">
                      {group.courseCode} - {group.courseName}
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors">
                    Open Chat
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
