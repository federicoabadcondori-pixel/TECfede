
import React from 'react';
import { UserStats } from '../types';
import { ArrowLeft, Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  stats: UserStats;
  onBack: () => void;
}

const data = [
  { name: 'Mon', score: 400 },
  { name: 'Tue', score: 300 },
  { name: 'Wed', score: 200 },
  { name: 'Thu', score: 278 },
  { name: 'Fri', score: 189 },
  { name: 'Sat', score: 239 },
  { name: 'Sun', score: 349 },
];

const StatsPanel: React.FC<Props> = ({ stats, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-all">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-slate-800">Profile & Progress</h2>
        <div className="w-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-panel p-8 rounded-[2.5rem] flex items-center space-x-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-indigo-600 p-1">
              <img src={`https://picsum.photos/seed/${stats.level}/200`} className="w-full h-full rounded-full object-cover" alt="Profile" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-600 rounded-full border-4 border-white flex items-center justify-center text-white font-bold">
              {stats.level}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-900 mb-1">Scholar One</h3>
            <p className="text-indigo-600 font-semibold mb-4">Master of Biology & Tech</p>
            <div className="flex space-x-4">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">XP Points</p>
                <p className="text-xl font-bold text-slate-800">{stats.points}</p>
              </div>
              <div className="w-px h-10 bg-slate-100" />
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sessions</p>
                <p className="text-xl font-bold text-slate-800">{stats.completedSessions}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="w-8 h-8 text-indigo-200" />
            <span className="text-indigo-200 font-bold uppercase text-xs">Current Goal</span>
          </div>
          <p className="text-lg font-bold mb-4">Top 10% of global students this month</p>
          <div className="w-full h-2 bg-indigo-400/30 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-white rounded-full" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-[2.5rem]">
          <h4 className="text-lg font-bold mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-indigo-500" />
            Weekly Performance
          </h4>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 4, 4]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-[2.5rem]">
          <h4 className="text-lg font-bold mb-6 flex items-center">
            <Award className="w-5 h-5 mr-2 text-amber-500" />
            Milestones
          </h4>
          <div className="space-y-4">
            <MilestoneItem icon={<Medal className="text-amber-500" />} title="Quick Learner" desc="Finished 5 sessions in a day" completed />
            <MilestoneItem icon={<Award className="text-indigo-500" />} title="Quiz Master" desc="Get 100% on 10 quizzes" progress={60} />
            <MilestoneItem icon={<Star className="text-rose-500" />} title="Perfect Streak" desc="Study for 7 days in a row" progress={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

const MilestoneItem: React.FC<{ icon: React.ReactNode, title: string, desc: string, completed?: boolean, progress?: number }> = ({ icon, title, desc, completed, progress }) => (
  <div className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${completed ? 'bg-emerald-50' : 'bg-slate-100'}`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <h5 className="font-bold text-slate-800 truncate">{title}</h5>
      <p className="text-xs text-slate-400 truncate">{desc}</p>
      {progress !== undefined && (
        <div className="mt-2 w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
    {completed && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
  </div>
);

const CheckCircle2: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

const Star: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

export default StatsPanel;
