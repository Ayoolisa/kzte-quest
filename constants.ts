
import { Quest, QuestCategory, QuestType } from './types';

export const QUESTS: Quest[] = [
  {
    id: 1,
    title: 'What is KZTE?',
    description: 'Read a short article and answer a quick quiz about the KZTE stablecoin.',
    category: QuestCategory.LEARN,
    rewardKzte: 100,
    rewardPoints: 10,
    content: 'KZTE is a digital asset fully backed 1:1 by the Kazakhstani tenge, issued by the licensed platform Intebix. It brings the stability of the national currency to the blockchain, enabling secure, transparent, and fast transactions. \n\n**Now, answer this:** What is KZTE backed by?',
    questType: QuestType.QUIZ,
    quizOptions: ['The US Dollar', 'Gold', 'The Kazakhstani Tenge', 'Bitcoin'],
    correctAnswer: 'The Kazakhstani Tenge'
  },
  {
    id: 2,
    title: 'Why Stablecoins Matter',
    description: 'Understand the role of stablecoins in the digital economy.',
    category: QuestCategory.LEARN,
    rewardKzte: 100,
    rewardPoints: 10,
    content: 'Stablecoins are crucial for DeFi, cross-border payments, and e-commerce because they combine the benefits of cryptocurrency (speed, low fees) with the stability of fiat currency, avoiding the volatility of assets like Bitcoin. They act as a reliable medium of exchange. \n\n**What is a key benefit of stablecoins?**',
    questType: QuestType.QUIZ,
    quizOptions: ['High Volatility', 'Anonymity', 'Replacing Banks', 'Combining crypto benefits with fiat stability'],
    correctAnswer: 'Combining crypto benefits with fiat stability'
  },
  {
    id: 3,
    title: 'Follow on X (Twitter)',
    description: 'Follow the official Superteam KZ and Intebix accounts on X.',
    category: QuestCategory.SOCIAL,
    rewardKzte: 50,
    rewardPoints: 5,
    content: 'Stay updated with the latest news and announcements! Follow @SuperteamKZ and @Intebix on X (formerly Twitter). Once you have followed, click "Complete Quest" to claim your reward.',
    questType: QuestType.INFO
  },
  {
    id: 4,
    title: 'Join the Telegram Channel',
    description: 'Become a part of the vibrant KZTE community on Telegram.',
    category: QuestCategory.SOCIAL,
    rewardKzte: 50,
    rewardPoints: 5,
    content: 'Join the conversation and connect with other enthusiasts in our official Telegram channel. Click the link, join the group, and then come back to complete the quest.',
    questType: QuestType.INFO
  },
  {
    id: 5,
    title: 'First Wallet Transfer',
    description: 'Use a partner wallet to make your first P2P transfer with KZTE.',
    category: QuestCategory.INTEGRATION,
    rewardKzte: 200,
    rewardPoints: 25,
    content: 'Experience the speed of blockchain firsthand! Download one of our partner wallets (e.g., Phantom, Solflare), fund it with some KZTE, and send at least 10 KZTE to a friend. This quest simulates the completion of that action.',
    questType: QuestType.INFO
  },
  {
    id: 6,
    title: 'Swap on a DEX',
    description: 'Perform a test swap involving KZTE on a supported Decentralized Exchange.',
    category: QuestCategory.INTEGRATION,
    rewardKzte: 250,
    rewardPoints: 30,
    content: 'Dive into DeFi! Visit a partner DEX like Raydium or Orca and perform a swap from KZTE to another token (or vice versa). This is a great way to understand how liquidity pools work. We will verify your wallet address for this activity.',
    questType: QuestType.INFO
  },
];
