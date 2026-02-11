
import React, { useState, useEffect, useCallback } from 'react';
import { 
  BookOpen, 
  LayoutDashboard, 
  Upload, 
  BrainCircuit, 
  Trophy, 
  Settings, 
  ChevronRight,
  Loader2,
  CheckCircle2,
  Target
} from 'lucide-react';
import { ViewType, StudySession, UserStats, Badge } from './types';
import Dashboard from './components/Dashboard';
import FileUploader from './components/FileUploader';
import QuizView from './components/QuizView';
import FlashcardView from './components/FlashcardView';
import MindMapView from './components/MindMapView';
import StatsPanel from './components/StatsPanel';

const INITIAL_STATS: UserStats = {
  points: 0,
  level: 1,
  badges: [],
  streak: 0,
  completedSessions: 0
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [session, setSession] = useState<StudySession | null>(null);
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('eduspark_stats');
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('eduspark_stats', JSON.stringify(stats));
  }, [stats]);

  const addPoints = (points: number) => {
    setStats(prev => {
      const newPoints = prev.points + points;
      const newLevel = Math.floor(newPoints / 500) + 1;
      return {
        ...prev,
        points: newPoints,
        level: newLevel
      };
    });
  };

  const handleSessionComplete = () => {
    addPoints(100);
    setStats(prev => ({ ...prev, completedSessions: prev.completedSessions + 1 }));
    setCurrentView('stats');
  };

  const renderView = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
          <h2 className="text-xl font-semibold text-slate-700">AI is analyzing your content...</h2>
          <p className="text-slate-500">Generating quizzes, flashcards and mind maps.</p>
        </div>
      );
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard onStartUpload={() => setCurrentView('upload')} stats={stats} />;
      case 'upload':
        return <FileUploader onSessionGenerated={(s) => { setSession(s); setCurrentView('study'); }} setLoading={setLoading} />;
      case 'study':
        return (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass-panel p-8 rounded-3xl shadow-xl">
              <h1 className="text-3xl font-bold text-slate-900 mb-4">{session?.title}</h1>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">{session?.summary}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {session?.concepts.map(c => (
                  <span key={c} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">#{c}</span>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setCurrentView('quiz')}
                  className="flex flex-col items-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-400 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-3">
                    <Target className="w-6 h-6" />
                  </div>
                  <span className="font-semibold">Interactive Quiz</span>
                  <span className="text-xs text-slate-400">Challenge yourself</span>
                </button>
                <button 
                  onClick={() => setCurrentView('flashcards')}
                  className="flex flex-col items-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-400 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-3">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="font-semibold">Flashcards</span>
                  <span className="text-xs text-slate-400">Active recall</span>
                </button>
                <button 
                  onClick={() => setCurrentView('mindmap')}
                  className="flex flex-col items-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-400 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <span className="font-semibold">Mind Map</span>
                  <span className="text-xs text-slate-400">Visual mapping</span>
                </button>
              </div>
            </div>
          </div>
        );
      case 'quiz':
        return session ? <QuizView questions={session.quizzes} onComplete={handleSessionComplete} onBack={() => setCurrentView('study')} /> : null;
      case 'flashcards':
        return session ? <FlashcardView cards={session.flashcards} onBack={() => setCurrentView('study')} /> : null;
      case 'mindmap':
        return session ? <MindMapView data={session.mindMap} onBack={() => setCurrentView('study')} /> : null;
      case 'stats':
        return <StatsPanel stats={stats} onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard onStartUpload={() => setCurrentView('upload')} stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-0 md:pl-20">
      {/* Mobile Sidebar (Bottom Nav) */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-200 flex items-center justify-around px-4 z-50 md:hidden">
        <NavButton icon={<LayoutDashboard />} active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
        <NavButton icon={<Upload />} active={currentView === 'upload'} onClick={() => setCurrentView('upload')} />
        <NavButton icon={<Trophy />} active={currentView === 'stats'} onClick={() => setCurrentView('stats')} />
        <NavButton icon={<Settings />} active={currentView === 'stats'} onClick={() => {}} />
      </nav>

      {/* Desktop Sidebar */}
      <nav className="fixed left-0 top-0 bottom-0 w-20 bg-white border-r border-slate-200 hidden md:flex flex-col items-center py-8 space-y-8 z-50">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 mb-4">
          <BrainCircuit className="w-8 h-8" />
        </div>
        <NavButton icon={<LayoutDashboard />} active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
        <NavButton icon={<Upload />} active={currentView === 'upload'} onClick={() => setCurrentView('upload')} />
        <NavButton icon={<Trophy />} active={currentView === 'stats'} onClick={() => setCurrentView('stats')} />
        <div className="mt-auto">
          <NavButton icon={<Settings />} active={false} onClick={() => {}} />
        </div>
      </nav>

      <main className="p-4 md:p-12 max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-slate-400 font-medium">Hello, Scholar! 👋</h2>
            <h1 className="text-2xl font-bold text-slate-900">EduSpark AI</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-slate-900">Level {stats.level}</p>
              <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden mt-1">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-500" 
                  style={{ width: `${(stats.points % 500) / 5}%` }}
                />
              </div>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-indigo-600 p-0.5">
              <img src={`https://picsum.photos/seed/${stats.level}/100`} className="w-full h-full rounded-full object-cover" alt="Profile" />
            </div>
          </div>
        </header>

        {renderView()}
      </main>
    </div>
  );
};

const NavButton: React.FC<{ icon: React.ReactNode, active: boolean, onClick: () => void }> = ({ icon, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-2xl transition-all duration-300 ${
      active ? 'bg-indigo-50 text-indigo-600 scale-110' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
    }`}
  >
    {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
  </button>
);

export default App;
