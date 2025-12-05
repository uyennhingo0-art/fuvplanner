import {
  Home,
  BarChart3,
  BookOpen,
  Compass,
  GraduationCap,
  BookMarked,
  Calendar,
  Users,
  Award,
  Shield,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'progress', label: 'Progress', icon: BarChart3 },
  { id: 'core', label: 'Core', icon: BookOpen },
  { id: 'exploratory', label: 'Exploratory', icon: Compass },
  { id: 'major', label: 'Major', icon: GraduationCap },
  { id: 'minor', label: 'Minor', icon: BookMarked },
  { id: 'planner', label: 'Planner', icon: Calendar },
  { id: 'groups', label: 'Study Groups', icon: Users },
  { id: 'capstone', label: 'Capstone', icon: Award },
  { id: 'moet', label: 'MOET', icon: Shield },
  { id: 'admin', label: 'Admin', icon: Settings },
];

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold text-primary">FUV</h1>
            <p className="text-xs text-gray-600">Study Planner</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 text-xs text-gray-500">Data stays local in your browser.</div>
    </aside>
  );
}
