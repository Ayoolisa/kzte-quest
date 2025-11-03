
import React from 'react';
import { Quest, QuestCategory } from '../types';
import QuestCard from './QuestCard';
import { LearnIcon, SocialIcon, EcosystemIcon } from './Header';

interface QuestListProps {
  category: QuestCategory;
  quests: Quest[];
  completedQuests: Set<number>;
  onStartQuest: (quest: Quest) => void;
}

const categoryIcons: Record<QuestCategory, React.ReactNode> = {
    [QuestCategory.LEARN]: <LearnIcon />,
    [QuestCategory.SOCIAL]: <SocialIcon />,
    [QuestCategory.INTEGRATION]: <EcosystemIcon />,
};

const QuestList: React.FC<QuestListProps> = ({ category, quests, completedQuests, onStartQuest }) => {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-2 bg-white rounded-lg shadow-sm">
            {categoryIcons[category]}
        </div>
        <h2 className="text-3xl font-bold text-slate-800">{category}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quests.map(quest => (
          <QuestCard
            key={quest.id}
            quest={quest}
            isCompleted={completedQuests.has(quest.id)}
            onStart={() => onStartQuest(quest)}
          />
        ))}
      </div>
    </section>
  );
};

export default QuestList;
