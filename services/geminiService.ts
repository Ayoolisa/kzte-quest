
import { GoogleGenAI } from "@google/genai";
import { Message, MessageSender } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this prototype, we'll log an error.
  console.error("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const systemInstruction = `You are a friendly and helpful AI assistant for "KZTE Quest", a platform designed to educate users about KZTE, the tenge-backed stablecoin.
Your goal is to answer questions about KZTE, blockchain, stablecoins, and the quests available on the platform.
Keep your answers concise, easy to understand for beginners, and maintain a positive and encouraging tone.
Do not provide financial advice.
KZTE is a stablecoin backed 1:1 by the Kazakhstani Tenge. It is issued by Intebix.
The platform's goal is to increase adoption and understanding of KZTE.`;

export const askKzteHelper = async (prompt: string, history: Message[]): Promise<string> => {
  if (!API_KEY) {
    return "I'm sorry, my connection to the AI service is not configured. Please contact support.";
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
      },
      history: history.map(msg => ({
        role: msg.sender === MessageSender.USER ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
    });

    const response = await chat.sendMessage({ message: prompt });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I'm sorry, I encountered an error while trying to respond. Please try again later.";
  }
};
