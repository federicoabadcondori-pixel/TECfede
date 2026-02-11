
import React, { useState } from 'react';
import { Flashcard } from '../types';
import { ArrowLeft, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  cards: Flashcard[];
  onBack: () => void;
}

const FlashcardView: React.FC<Props> = ({ cards, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-all">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="font-bold text-slate-400">Card {currentIndex + 1} of {cards.length}</span>
        <div className="w-10" />
      </div>

      <div 
        className="relative perspective-1000 h-[400px] cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full transition-all duration-700 preserve-3d shadow-2xl rounded-[3rem] ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute inset-0 backface-hidden glass-panel flex flex-col items-center justify-center p-12 rounded-[3rem] border-2 border-indigo-100 bg-white">
            <span className="text-indigo-500 font-bold mb-8 uppercase tracking-widest text-xs">Concept</span>
            <p className="text-3xl font-bold text-center text-slate-800 leading-tight">
              {currentCard.front}
            </p>
            <div className="mt-auto flex items-center space-x-2 text-slate-400 group-hover:text-indigo-400 transition-colors">
              <RotateCw className="w-4 h-4" />
              <span className="text-sm font-semibold">Tap to flip</span>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 glass-panel flex flex-col items-center justify-center p-12 rounded-[3rem] border-2 border-emerald-100 bg-emerald-50">
            <span className="text-emerald-500 font-bold mb-8 uppercase tracking-widest text-xs">Explanation</span>
            <p className="text-xl text-center text-emerald-900 leading-relaxed font-medium">
              {currentCard.back}
            </p>
            <div className="mt-auto flex items-center space-x-2 text-emerald-400">
              <RotateCw className="w-4 h-4" />
              <span className="text-sm font-semibold">Tap to flip back</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center space-x-6">
        <button 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="p-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-slate-600 shadow-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="p-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default FlashcardView;
