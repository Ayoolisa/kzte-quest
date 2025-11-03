
import React, { useState, useCallback, useMemo } from 'react';
import { Quest, QuestCategory } from './types';
import { QUESTS } from './constants';
import Header, { KzteIcon, StarIcon } from './components/Header';
import QuestList from './components/QuestList';
import QuestModal from './components/QuestModal';
import Chatbot from './components/Chatbot';

// --- SUB-COMPONENTS ---

// ProgressBar Component
interface ProgressBarProps {
  percentage: number;
}
const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-slate-800">Your Progress</h3>
        <span className="text-lg font-bold text-sky-600">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-sky-500 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Toast Component
export interface ToastData {
  id: number;
  message: string;
  type: 'kzte' | 'qp' | 'info';
}
interface ToastProps extends Omit<ToastData, 'id'> {}
const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'kzte':
        return <KzteIcon className="h-5 w-5 mr-2 text-sky-500" />;
      case 'qp':
        return <StarIcon className="h-5 w-5 mr-2 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <div
      className="flex items-center bg-white rounded-full shadow-lg px-4 py-2 text-sm font-semibold animate-slide-in-down"
      role="alert"
      aria-live="assertive"
    >
      {getIcon()}
      <span>{message}</span>
      <style>{`
        @keyframes slide-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [userBalance, setUserBalance] = useState<number>(100);
  const [questPoints, setQuestPoints] = useState<number>(0);
  const [completedQuests, setCompletedQuests] = useState<Set<number>>(new Set());
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const handleStartQuest = useCallback((quest: Quest) => {
    setActiveQuest(quest);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveQuest(null);
  }, []);

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = Date.now() + Math.random(); // Add random to avoid collisions
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const handleCompleteQuest = useCallback((questId: number, rewardKzte: number, rewardPoints: number) => {
    if (!completedQuests.has(questId)) {
      setCompletedQuests(prev => new Set(prev).add(questId));
      setUserBalance(prev => prev + rewardKzte);
      setQuestPoints(prev => prev + rewardPoints);
      addToast({ message: `+${rewardKzte} KZTE`, type: 'kzte' });
      addToast({ message: `+${rewardPoints} QP`, type: 'qp' });
    }
    handleCloseModal();
  }, [completedQuests, handleCloseModal, addToast]);

  const groupedQuests = useMemo(() => QUESTS.reduce((acc, quest) => {
    if (!acc[quest.category]) {
      acc[quest.category] = [];
    }
    acc[quest.category].push(quest);
    return acc;
  }, {} as Record<QuestCategory, Quest[]>), []);
  
  const completionPercentage = (completedQuests.size / QUESTS.length) * 100;

  return (
    <div className="bg-slate-100 min-h-screen font-sans text-slate-800">
      <Header kzteBalance={userBalance} questPoints={questPoints} />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tighter">Welcome to KZTE Quest</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Learn about the tenge-backed stablecoin, complete challenges, and earn rewards to grow the ecosystem.
          </p>
        </div>
        
        <div className="mb-12">
            <ProgressBar percentage={completionPercentage} />
        </div>

        {Object.entries(groupedQuests).map(([category, quests]) => (
          <QuestList
            key={category}
            category={category as QuestCategory}
            quests={quests}
            completedQuests={completedQuests}
            onStartQuest={handleStartQuest}
          />
        ))}
      </main>
      {activeQuest && (
        <QuestModal
          quest={activeQuest}
          onClose={handleCloseModal}
          onComplete={handleCompleteQuest}
        />
      )}
      <Chatbot />
      <div className="fixed top-20 right-4 z-[60] space-y-2">
        {toasts.map(toast => (
          <Toast key={toast.id} message={toast.message} type={toast.type} />
        ))}
      </div>
      <style>{`
        .animate-slide-in-down {
          animation: slide-in-down 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
