import React, { useState, useCallback, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import type { ChatMessage, FinancialState } from './types';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import FinancialSummary from './components/FinancialSummary';

const App: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const [financialState, setFinancialState] = useState<FinancialState | null>(null);

  const initialChatMessage: ChatMessage = {
    role: 'model',
    text: 'שלום! אני Savvy, העוזר הפיננסי האישי שלך. ספר לי על המצב הפיננסי שלך. למשל: "יש לי 1000 ש"ח במזומן, ואבא חייב לי 500 ש"ח". אני אעזור לך לעקוב אחרי הכל.'
  };

  useEffect(() => {
    if (process.env.API_KEY) {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const newChat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: `You are 'Savvy', a conversational personal financial assistant. Your goal is to help the user manage their finances through conversation. The user will tell you about their income, expenses, debts, and available funds. You must track these numbers throughout the conversation.

IMPORTANT:
1. After every conversational response, you MUST append a special JSON block that summarizes the user's complete financial state. This JSON block must be enclosed in triple backticks and marked as json.
Format:
\`\`\`json
{
  "cash": NUMBER,
  "bank": NUMBER,
  "debtsToUser": { "person_name": AMOUNT, ... },
  "userDebts": { "person_name": AMOUNT, ... }
}
\`\`\`

2. Only include keys in the JSON if you have data for them from the user. If a value becomes zero or is paid off, remove the corresponding key (e.g., from a debt object).

3. If the user asks to delete everything, clear data, reset, or start over, your conversational response must confirm the action (e.g., "Alright, I've cleared all your data. Let's start fresh!"). The JSON block you provide MUST be exactly:
\`\`\`json
{
  "reset": true
}
\`\`\`

4. Your conversational response must be friendly, encouraging, and ALWAYS in Hebrew. The JSON block should be separate from your conversational text.`,
        },
      });
      setChat(newChat);
      setChatHistory([initialChatMessage]);
    }
  }, []);

  const parseFinancialState = (text: string): { cleanText: string; state: FinancialState | null } => {
    const jsonRegex = /```json\n([\s\S]*?)\n```/;
    const match = text.match(jsonRegex);

    if (match && match[1]) {
      try {
        const state = JSON.parse(match[1]);
        const cleanText = text.replace(jsonRegex, '').trim();
        return { cleanText, state };
      } catch (error) {
        console.error("Failed to parse financial state JSON:", error);
      }
    }

    return { cleanText: text, state: null };
  };

  const handleSendMessage = useCallback(async (message: string) => {
    if (!chat) return;

    setIsChatLoading(true);
    setChatHistory(prev => [...prev, { role: 'user', text: message }]);

    try {
      const result = await chat.sendMessage({ message });
      const responseText = result.text;
      
      const { cleanText, state } = parseFinancialState(responseText);

      if (state && state.reset) {
        setFinancialState(null);
        setChatHistory([{ role: 'model', text: cleanText }]);
      } else {
        setChatHistory(prev => [...prev, { role: 'model', text: cleanText }]);
        if (state) {
          // Merge new state with previous state to keep data that might have been missed in the latest update
          setFinancialState(prevState => ({ ...(prevState || {}), ...state }));
        }
      }

    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      setChatHistory(prev => [...prev, { role: 'model', text: 'מצטער, נתקלתי בבעיה. אנא נסה שוב מאוחר יותר.' }]);
    } finally {
      setIsChatLoading(false);
    }
  }, [chat]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto flex flex-col h-full">
        <Header />
        {financialState && <FinancialSummary data={financialState} />}
        <main className="mt-8 flex-grow w-full">
          <div className="bg-slate-800 p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col h-[calc(100vh-350px)] sm:h-[calc(100vh-320px)]">
             <h2 className="text-2xl font-bold mb-4 text-emerald-400 text-center">שוחח עם Savvy AI</h2>
            <Chatbot
              history={chatHistory}
              isLoading={isChatLoading}
              onSendMessage={handleSendMessage}
              apiKeyMissing={!process.env.API_KEY}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;