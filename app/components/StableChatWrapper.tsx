'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import SimpleMarkdown
import SimpleMarkdown from './SimpleMarkdown';

// Define a fallback UI in case the Chat component fails
const FallbackChatUI = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([
    { text: "Hello! Welcome to **F9 Productions**—your go-to architecture and design firm in Colorado. How can I help you today?", isUser: false }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    const userInput = message;
    setMessage('');
    setIsLoading(true);
    
    try {
      // Call API with current message
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are the AI customer support assistant for F9 Productions, a premier architecture and design firm serving Colorado." },
            { role: "user", content: userInput }
          ]
        })
      });
      
      if (!response.ok) {
        throw new Error('API response not ok');
      }
      
      const data = await response.json();
      // Add bot response
      setMessages(prev => [...prev, { text: data.content, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I encountered an error while processing your request. Please try again later.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fallback-chat">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
            <div className="message-bubble">
              {msg.isUser ? (
                <p>{msg.text}</p>
              ) : (
                <SimpleMarkdown text={msg.text} />
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="typing-indicator">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !message.trim()}
        >
          Send
        </button>
      </div>
      
      <style jsx>{`
        .fallback-chat {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          border-radius: 12px;
          overflow: hidden;
          background-color: rgba(255, 255, 255, 0.7);
        }
        
        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .message {
          display: flex;
          margin-bottom: 10px;
        }
        
        .message.user {
          justify-content: flex-end;
        }
        
        .message-bubble {
          max-width: 80%;
          padding: 10px 15px;
          border-radius: 18px;
          position: relative;
        }
        
        .message.bot .message-bubble {
          background-color: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .message.user .message-bubble {
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
        }
        
        .typing-indicator {
          display: flex;
          align-items: center;
          align-self: flex-start;
          padding: 12px 16px;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 18px;
          margin: 10px 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.2);
        }
        
        .dot {
          width: 10px;
          height: 10px;
          margin: 0 3px;
          background-color: #000;
          border-radius: 50%;
          opacity: 0.8;
          animation: typing-animation 1.4s infinite ease-in-out;
        }
        
        .dot:nth-child(1) { animation-delay: 0s; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes typing-animation {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.5); }
        }
        
        .input-area {
          display: flex;
          padding: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          background-color: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(5px);
        }
        
        input {
          flex: 1;
          padding: 12px 16px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background-color: rgba(255, 255, 255, 0.6);
          margin-right: 8px;
          outline: none;
        }
        
        button {
          padding: 8px 16px;
          border-radius: 50%;
          background-color: #000;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

// Create a named fallback component to fix the display-name ESLint error
const FallbackComponent = () => <FallbackChatUI />;
FallbackComponent.displayName = 'FallbackChatbotUI';

// Dynamically import the ChatbotUI with error boundary
const ChatbotUI = dynamic(() => import('./ChatbotUI').catch(() => {
  console.error('Error loading ChatbotUI component, falling back to stable implementation');
  return FallbackComponent;
}), { 
  ssr: false,
    loading: () => {    const LoadingComponent = () => (      <div style={{         display: 'flex',         justifyContent: 'center',         alignItems: 'center',        height: '100%',        width: '100%'      }}>        <div className="loading-spinner"></div>        <style jsx>{`          .loading-spinner {            width: 40px;            height: 40px;            border-radius: 50%;            border: 3px solid rgba(0, 0, 0, 0.1);            border-top-color: #000;            animation: spin 1s infinite linear;          }                    @keyframes spin {            to { transform: rotate(360deg); }          }        `}</style>      </div>    );    LoadingComponent.displayName = 'ChatbotUILoading';    return <LoadingComponent />;  }
});

// The main wrapper component
export default function StableChatWrapper() {
  const [hasError, setHasError] = useState(false);
  
  // Error boundary functionality
  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      // Check if the error is from the ChatUI component
      if (event.message.includes('chatui') || 
          event.error?.stack?.includes('chatui') ||
          event.message.includes('not a function')) {
        console.error('ChatUI error detected, falling back to stable implementation', event);
        setHasError(true);
        // Prevent the error from propagating
        event.preventDefault();
      }
    };
    
    window.addEventListener('error', errorHandler);
    
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);
  
  if (hasError) {
    return <FallbackChatUI />;
  }
  
  return <ChatbotUI />;
} 