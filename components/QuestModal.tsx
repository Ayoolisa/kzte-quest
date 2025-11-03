
import React, { useState, useEffect } from 'react';
import { Quest, QuestType } from '../types';

// Icons for UI feedback
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

interface QuestModalProps {
  quest: Quest;
  onClose: () => void;
  onComplete: (questId: number, rewardKzte: number, rewardPoints: number) => void;
}

const QuestModal: React.FC<QuestModalProps> = ({ quest, onClose, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const isQuiz = quest.questType === QuestType.QUIZ;
  const canComplete = isQuiz ? isCorrect : true;

  const handleQuizSubmit = (option: string) => {
    setSelectedAnswer(option);
    if (option === quest.correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleComplete = () => {
    if (!canComplete) return;

    setIsCompleted(true);
    // Add a delay to show the success animation before closing
    setTimeout(() => {
      onComplete(quest.id, quest.rewardKzte, quest.rewardPoints);
    }, 1500);
  };

  const getOptionClasses = (option: string) => {
    if (selectedAnswer === null) {
      return 'border-slate-300 hover:border-sky-500 hover:bg-sky-50';
    }
    if (option === selectedAnswer) {
      return option === quest.correctAnswer
        ? 'border-green-500 bg-green-100 ring-2 ring-green-500'
        : 'border-red-500 bg-red-100 ring-2 ring-red-500';
    }
    return 'border-slate-300';
  };

  useEffect(() => {
    // Reset state if quest changes
    setSelectedAnswer(null);
    setIsCorrect(null);
    setIsCompleted(false);
  }, [quest]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all" 
        onClick={e => e.stopPropagation()}
        style={{ animation: 'fade-in-up 0.3s ease-out' }}
      >
        {isCompleted ? (
          <div className="p-8 flex flex-col items-center justify-center text-center h-80">
            <div className="scale-150 animate-bounce">
              <CheckIcon />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mt-6">Quest Complete!</h2>
            <p className="text-slate-600 mt-2">Your rewards have been added to your account.</p>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">{quest.title}</h2>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 rounded-full -mr-2 -mt-2">
                <XIcon />
              </button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="prose prose-slate max-w-none">
                <p style={{ whiteSpace: 'pre-wrap' }}>{quest.content}</p>
              </div>

              {isQuiz && quest.quizOptions && (
                <div className="mt-6 space-y-3">
                  {quest.quizOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizSubmit(option)}
                      className={`w-full text-left p-4 border rounded-lg transition-all text-slate-700 ${getOptionClasses(option)}`}
                      disabled={selectedAnswer !== null}
                    >
                      {option}
                    </button>
                  ))}
                  {isCorrect === false && <p className="text-red-600 text-sm mt-2">Not quite, try another quest and come back!</p>}
                </div>
              )}
            </div>
            <div className="p-6 bg-slate-50 rounded-b-2xl">
              <div className="flex justify-between items-center text-sm mb-4">
                  <span className="font-semibold text-sky-600">Reward: {quest.rewardKzte} KZTE</span>
                  <span className="font-semibold text-amber-500">{quest.rewardPoints} QP</span>
              </div>
              <button
                onClick={handleComplete}
                disabled={!canComplete}
                className="w-full px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
              >
                Complete Quest
              </button>
            </div>
          </>
        )}
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(-5%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
      `}</style>
    </div>
  );
};

export default QuestModal;
