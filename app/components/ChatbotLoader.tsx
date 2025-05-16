'use client';

import dynamic from 'next/dynamic';

// Dynamically import the ChatbotUI with ssr: false
const ChatbotUI = dynamic(() => import('./ChatbotUI'), { ssr: false });

export default function ChatbotLoader() {
  return <ChatbotUI />;
} 