import { BookOpen, TrendingUp, Map } from 'lucide-react';
import { CircularProgress } from '../components/ProgressBar';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-3">FUV Study Planner</h1>
        <p className="text-gray-600">Plan your academic journey at Fulbright University Vietnam</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <button
          onClick={() => onNavigate('progress')}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Degree Tracking</h3>
          <p className="text-sm text-gray-600">
            Monitor your progress across all degree requirements
          </p>
        </button>

        <button
          onClick={() => onNavigate('planner')}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Planner</h3>
          <p className="text-sm text-gray-600">
            Plan semesters with intelligent recommendations
          </p>
        </button>

        <button
          onClick={() => onNavigate('major')}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Map className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Curriculum Map</h3>
          <p className="text-sm text-gray-600">
            Visualize your major requirements and progression
          </p>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <CircularProgress current={64} total={128} size={160} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Progress</h2>
            <p className="text-gray-600 mb-4">
              You've completed 64 out of 128 required credits. Keep up the great work!
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Current GPA</p>
                <p className="text-xl font-bold text-primary">3.67</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Completed Courses</p>
                <p className="text-xl font-bold text-primary">18</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-primary to-blue-900 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Getting Started</h3>
          <p className="text-sm text-blue-100 mb-4">
            New to the planner? Let's set up your profile.
          </p>
          <button className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
            Start Setup
          </button>
        </div>

        <div className="bg-gradient-to-br from-accent to-orange-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Choose Your Path</h3>
          <p className="text-sm text-orange-100 mb-4">
            Explore majors and minors for your academic path.
          </p>
          <button className="bg-white text-accent px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
            Explore Programs
          </button>
        </div>
      </div>
    </div>
  );
}
