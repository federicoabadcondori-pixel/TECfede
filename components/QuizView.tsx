
import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle, ArrowRight } from 'lucide-react';

interface Props {
  questions: QuizQuestion[];
  onComplete: () => void;
  onBack: () => void;
}

const QuizView: React.FC<Props> = ({ questions, onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion.answer;

  const handleAnswer = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);
    if (option === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-all">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <p className="text-slate-400 font-bold text-sm uppercase">Challenge Mode</p>
          <div className="flex items-center space-x-2 mt-1">
            {questions.map((_, i) => (
              <div 
                key={i} 
                className={`h-2 w-8 rounded-full transition-all duration-300 ${
                  i < currentIndex ? 'bg-indigo-600' : i === currentIndex ? 'bg-indigo-300' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-2xl font-bold">
          {score}/{questions.length}
        </div>
      </div>

      <div className="glass-panel p-8 rounded-[3rem] shadow-2xl">
        <div className="mb-8">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
            {currentQuestion.type.replace('-', ' ')}
          </span>
          <h2 className="text-2xl font-bold text-slate-800 mt-4 leading-snug">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.options?.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
              className={`p-5 rounded-2xl text-left font-semibold transition-all flex items-center justify-between border-2 ${
                isAnswered 
                  ? option === currentQuestion.answer 
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                    : option === selectedAnswer
                      ? 'bg-rose-50 border-rose-500 text-rose-700'
                      : 'bg-white border-slate-100 text-slate-400'
                  : 'bg-white border-slate-100 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700'
              }`}
            >
              <span>{option}</span>
              {isAnswered && option === currentQuestion.answer && <CheckCircle2 className="w-5 h-5" />}
              {isAnswered && option === selectedAnswer && option !== currentQuestion.answer && <XCircle className="w-5 h-5" />}
            </button>
          ))}
        </div>

        {isAnswered && (
          <div className={`mt-8 p-6 rounded-2xl animate-in zoom-in duration-300 ${isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-lg mb-1">{isCorrect ? 'Brilliant!' : 'Not quite right'}</p>
                <p className="text-sm opacity-90">{currentQuestion.explanation}</p>
              </div>
            </div>
            <button 
              onClick={nextQuestion}
              className="mt-6 w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'Complete Challenge'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizView;
