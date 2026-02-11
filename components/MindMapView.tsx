
import React from 'react';
import { MindMapNode } from '../types';
import { ArrowLeft, ChevronRight, Share2, Download } from 'lucide-react';

interface Props {
  data: MindMapNode;
  onBack: () => void;
}

const NodeComponent: React.FC<{ node: MindMapNode, depth: number }> = ({ node, depth }) => {
  return (
    <div className={`relative pl-8 mt-4 ${depth > 0 ? 'border-l-2 border-slate-200 ml-4' : ''}`}>
      <div className={`flex items-center space-x-3 p-4 rounded-2xl border-2 transition-all hover:shadow-md cursor-default ${
        depth === 0 ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-100'
      }`}>
        {depth > 0 && <ChevronRight className="w-4 h-4 text-indigo-400" />}
        <span className="font-bold">{node.label}</span>
      </div>
      <div className="space-y-2">
        {node.children.map((child) => (
          <NodeComponent key={child.id} node={child} depth={depth + 1} />
        ))}
      </div>
    </div>
  );
};

const MindMapView: React.FC<Props> = ({ data, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-all">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-slate-800">Concept Map</h2>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-slate-100 rounded-full"><Download className="w-5 h-5 text-slate-600" /></button>
          <button className="p-2 hover:bg-slate-100 rounded-full"><Share2 className="w-5 h-5 text-slate-600" /></button>
        </div>
      </div>

      <div className="glass-panel p-8 md:p-12 rounded-[3rem] min-h-[500px] overflow-x-auto">
        <div className="min-w-[600px]">
          <NodeComponent node={data} depth={0} />
        </div>
      </div>
    </div>
  );
};

export default MindMapView;
