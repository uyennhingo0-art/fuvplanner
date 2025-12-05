import { Bell, Settings, LogOut, User } from 'lucide-react';
import { useState } from 'react';

interface TopBarProps {
  studentName?: string;
  onLogout?: () => void;
}

export function TopBar({ studentName = 'John Doe', onLogout }: TopBarProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm text-gray-600">Welcome back,</h2>
          <p className="text-lg font-semibold text-gray-900">{studentName}</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 pl-2 pr-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {studentName.split(' ').map((n) => n[0]).join('')}
              </div>
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  View Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <div className="border-t border-gray-200 my-2" />
                <button
                  onClick={onLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
