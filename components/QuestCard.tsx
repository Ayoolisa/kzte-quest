
import React from 'react';
import { Quest } from '../types';

interface QuestCardProps {
  quest: Quest;
  isCompleted: boolean;
  onStart: () => void;
}

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const QuestCard: React.FC<QuestCardProps> = ({ quest, isCompleted, onStart }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${isCompleted ? 'opacity-60 bg-slate-50' : ''}`}>
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{quest.title}</h3>
        <p className="text-slate-600 mb-4 h-12 flex-grow">{quest.description}</p>
        <div className="flex justify-between items-center mb-4 text-sm mt-auto">
          <span className="font-semibold text-sky-600 bg-sky-100 px-3 py-1 rounded-full">Reward: {quest.rewardKzte} KZTE</span>
          <span className="font-semibold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">{quest.rewardPoints} QP</span>
        </div>
        {isCompleted ? (
          <div className="flex items-center justify-center w-full px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-800 bg-green-200">
            <CheckCircleIcon />
            Completed
          </div>
        ) : (
          <button
            onClick={onStart}
            className="w-full px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
          >
            Start Quest
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestCard;
