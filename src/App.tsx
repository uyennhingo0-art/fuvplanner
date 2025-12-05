import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { HomePage } from './pages/HomePage';
import { ProgressPage } from './pages/ProgressPage';
import { CorePage } from './pages/CorePage';
import { ExploratoryPage } from './pages/ExploratoryPage';
import { MajorPage } from './pages/MajorPage';
import { MinorPage } from './pages/MinorPage';
import { PlannerPage } from './pages/PlannerPage';
import { StudyGroupsPage } from './pages/StudyGroupsPage';
import { CapstonePage } from './pages/CapstonePage';
import { MOETPage } from './pages/MOETPage';
import { AdminPage } from './pages/AdminPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'progress':
        return <ProgressPage />;
      case 'core':
        return <CorePage />;
      case 'exploratory':
        return <ExploratoryPage />;
      case 'major':
        return <MajorPage />;
      case 'minor':
        return <MinorPage />;
      case 'planner':
        return <PlannerPage />;
      case 'groups':
        return <StudyGroupsPage />;
      case 'capstone':
        return <CapstonePage />;
      case 'moet':
        return <MOETPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar studentName="Alex Chen" />
        <main className="flex-1 overflow-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
