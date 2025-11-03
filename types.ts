
export enum QuestCategory {
  LEARN = 'Learn & Earn',
  SOCIAL = 'Social Engagement',
  INTEGRATION = 'Ecosystem Integration',
}

export enum QuestType {
  INFO = 'INFO', // Simple informational quest
  QUIZ = 'QUIZ', // A quest with a multiple-choice question
}

export interface Quest {
  id: number;
  title: string;
  description: string;
  category: QuestCategory;
  rewardKzte: number;
  rewardPoints: number;
  content: string; // Content/instructions for the modal
  questType: QuestType;
  quizOptions?: string[];
  correctAnswer?: string;
}

export enum MessageSender {
    USER = 'user',
    BOT = 'bot'
}

export interface Message {
    sender: MessageSender;
    text: string;
}
