
import React from 'react';
import { UserStats } from '../types';
import { Zap, Flame, Star, Clock, ArrowRight } from 'lucide-react';

interface Props {
  onStartUpload: () => void;
  stats: UserStats;
}

const Dashboard: React.FC<Props> = ({ onStartUpload, stats }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-indigo-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-indigo-200">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-indigo-200 font-semibold mb-2">TRANSFORM YOUR STUDYING</h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Master any subject with AI-powered gaming.</h1>
          <button 
            onClick={onStartUpload}
            className="group bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all flex items-center shadow-lg"
          >
            Start New Session
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
          <Zap className="w-64 h-64 text-white float-anim" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Star className="text-amber-500" />} label="Total XP" value={stats.points} />
        <StatCard icon={<Flame className="text-rose-500" />} label="Streak" value={`${stats.streak} Days`} />
        <StatCard icon={<Zap className="text-indigo-500" />} label="Level" value={stats.level} />
        <StatCard icon={<Clock className="text-emerald-500" />} label="Study Hours" value="12.5h" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-6">Recent Badges</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex-shrink-0 w-24 h-24 bg-slate-100 rounded-2xl flex flex-col items-center justify-center border-2 border-transparent hover:border-indigo-200 transition-all cursor-help group relative">
                <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${i}`} className="w-12 h-12" alt="Badge" />
                <span className="text-[10px] mt-2 font-bold text-slate-500 uppercase tracking-tighter">Bronze Rank</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-6">Learning Goals</h3>
          <div className="space-y-4">
            <GoalItem label="Complete 3 Quizzes" progress={66} />
            <GoalItem label="Master 20 Flashcards" progress={40} />
            <GoalItem label="Maintain 5-day streak" progress={80} />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string | number }> = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-3">
      {icon}
    </div>
    <p className="text-slate-500 text-sm font-medium">{label}</p>
    <p className="text-2xl font-bold text-slate-900">{value}</p>
  </div>
);

const GoalItem: React.FC<{ label: string, progress: number }> = ({ label, progress }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="font-semibold text-slate-700">{label}</span>
      <span className="text-indigo-600 font-bold">{progress}%</span>
    </div>
    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
      <div 
        className="h-full bg-indigo-500 transition-all duration-1000" 
        style={{ width: `${progress}%` }} 
      />
    </div>
  </div>
);

export default Dashboard;
