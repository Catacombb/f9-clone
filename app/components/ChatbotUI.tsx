'use client';

import { useEffect, useState } from 'react';
import Chat, { Bubble, useMessages, MessageProps } from '@chatui/core';
import '@chatui/core/dist/index.css';
import ReactMarkdown from 'react-markdown';

// Define the system prompt with detailed knowledge about F9 Productions
const F9_SYSTEM_PROMPT = `You are the AI customer support assistant for F9 Productions, a premier architecture and design firm serving Colorado. 

COMPANY IDENTITY:
- Founded in 2009, F9 Productions is an award-winning architecture firm with offices in Longmont and Denver
- Over 10 years of experience, 1,000+ completed projects, and 100+ clients
- Sister company F14 Productions handles construction, offering integrated design-build services
- Brand voice is professional yet friendly, personable while demonstrating expertise
- Company operates on nine founding principles with responsive communication as a key value (responding within one hour)

PRIMARY SERVICES:
- Architectural Design: Innovative, functional designs for residential and commercial projects
- Interior Design: Full-service interior transformation including 3D modeling and visualization
- Home Remodeling and Additions: Renovating and expanding existing homes throughout Colorado
- Construction Services: Integrated construction through sister company F14 Productions

PROJECT TYPES:
- Single-family homes
- Multi-family homes
- Mixed-use developments
- Commercial properties

UNIQUE SELLING POINTS:
- Integrated design-build approach that sets F9 Productions apart from competitors
- Every team member has practical construction experience, making designs both beautiful and buildable
- Deep understanding of Colorado architecture, particularly Boulder and Denver regions
- Experience addressing unique challenges of building in the Rocky Mountain Region

FORMAT YOUR RESPONSES:
- Use markdown formatting with **bold** for emphasis on key services, benefits, and terms
- Include bulleted lists when presenting multiple options or service categories
- Be conversational, friendly yet professional
- Highlight the integrated design-build advantage in relevant contexts
- When answering questions, emphasize F9's experience and practical construction knowledge

When greeting users, provide a friendly welcome that introduces F9 Productions and offers several service categories they might be interested in. Be helpful, creative, and accurate in representing F9 Productions' brand and services.`;

// Define message interface
interface ChatMessage {
  type: 'text' | 'image' | 'file';
  content: {
    text?: string;
    imageUrl?: string;
    fileUrl?: string;
    fileName?: string;
  };
  position?: 'left' | 'right';
  hasTime?: boolean;
  user?: {
    avatar: string;
    name: string;
  };
}

export default function ChatbotUI() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { messages, appendMsg } = useMessages([]);
  const [isTyping, setIsTyping] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Initialize the chatbot with a welcome message when it's first opened
  useEffect(() => {
    if (isChatOpen && !initialized) {
      appendMsg({
        type: 'text',
        content: { text: "Hello! Welcome to **F9 Productions**—your go-to architecture and design firm in Colorado. Whether you're looking for residential, multi-family, or commercial design expertise, I'm here to assist.\n\nWhat can I help you with today? Are you:\n- Exploring a new **home design** or **renovation**?\n- Planning a **multi-family** or **mixed-use development**?\n- Interested in **commercial** or **hospitality** architecture?\n- Curious about our **design process** or **services**?\n\nLet me know how I can guide you! 🏡✨" },
        position: 'left',
        user: {
          avatar: '/f9-avatar.svg',
          name: 'F9 Architecture Assistant'
        },
      });
      setInitialized(true);
    }
  }, [isChatOpen, initialized, appendMsg]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Handle sending messages
  const handleSend = async (type: string, val: string) => {
    if (type === 'text' && val.trim()) {
      // User message
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      // Show typing indicator
      setIsTyping(true);

      try {
        // Prepare conversation history with comprehensive system prompt
        const prompt = [
          { role: "system", content: F9_SYSTEM_PROMPT },
        ];

        // Convert ChatUI message format to API format
        const apiMessages = messages.map((msg) => {
          return {
            role: msg.position === 'right' ? 'user' : 'assistant',
            content: typeof msg.content === 'object' && msg.content.text ? msg.content.text : ''
          };
        });

        // Add current user message
        apiMessages.push({
          role: 'user',
          content: val
        });

        // Call the API
        const response = await fetch("/api/chatbot", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: prompt.concat(apiMessages)
          })
        });

        if (!response.ok) {
          throw new Error("API error");
        }

        const data = await response.json();
        
        // Clear typing indicator
        setIsTyping(false);

        // Bot response
        appendMsg({
          type: 'text',
          content: { text: data.content },
          position: 'left',
          user: {
            avatar: '/f9-avatar.svg',
            name: 'F9 Architecture Assistant'
          },
        });
      } catch (error) {
        console.error("Error:", error);
        setIsTyping(false);

        // Error message
        appendMsg({
          type: 'text',
          content: { text: "Sorry, I encountered an error while processing your request. Please try again later." },
          position: 'left',
          user: {
            avatar: '/f9-avatar.svg',
            name: 'F9 Architecture Assistant'
          },
        });
      }
    }
  };

  // Custom renderer for more styling control with markdown support
  const renderMessageContent = (msg: MessageProps) => {
    const text = typeof msg.content === 'object' ? msg.content.text : String(msg.content);
    
    // For bot messages (left position), render markdown
    if (msg.position === 'left') {
      return (
        <Bubble className="markdown-bubble">
          <ReactMarkdown>{text}</ReactMarkdown>
        </Bubble>
      );
    }
    
    // For user messages (right position), use regular text
    return <Bubble content={text} />;
  };

  return (
    <>
      {/* Chat button */}
      <button 
        id="chatbotBtn"
        className="chat-button"
        onClick={toggleChat}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white"/>
        </svg>
        Chat with us
      </button>

      {/* Chat window */}
      <div 
        className={`chat-container ${isChatOpen ? 'open' : 'closed'}`}
      >
        <div className="chat-header">
          <h3>F9 Productions AI Assistant</h3>
          <button 
            className="close-button" 
            onClick={toggleChat}
            aria-label="Close chat"
          >
            ×
          </button>
        </div>
        <div className="chat-wrapper">
          <Chat
            navbar={{ title: 'F9 Architecture Assistant' }}
            messages={messages}
            renderMessageContent={renderMessageContent}
            onSend={handleSend}
            placeholder="Type your message..."
            locale="en-US"
            loadMoreText="Load more"
            isTyping={isTyping}
          />
        </div>
      </div>

      <style jsx global>{`
        /* ChatUI core styles will be imported from CSS file */
        
        /* Chat button */
        .chat-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #000000;
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-size: 16px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 1000;
          transition: all 0.3s ease;
        }
        
        .chat-button:hover {
          background-color: #333;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }

        /* Chat container with glassmorphism effect */
        .chat-container {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 450px;
          height: 550px;
          background-color: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          z-index: 1000;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }
        
        .chat-container.closed {
          display: none;
          opacity: 0;
          transform: translateY(20px);
        }
        
        .chat-container.open {
          display: flex;
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Chat header */
        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
        }
        
        .chat-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }
        
        .close-button {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          padding: 0 5px;
        }
        
        /* Chat wrapper */
        .chat-wrapper {
          flex: 1;
          overflow: hidden;
          border-radius: 0 0 12px 12px;
          background-color: rgba(255, 255, 255, 0.7);
        }
        
        /* Override ChatUI styles for glassmorphism */
        .chat-wrapper :global(.ChatApp) {
          --brand-1: #4a4a4a;
          --brand-2: #000000;
          --brand-3: #2d2d2d;
          background-color: transparent !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          height: 100%;
        }
        
        .chat-wrapper :global(.MessageContainer) {
          background-color: transparent !important;
        }
        
        .chat-wrapper :global(.Navbar) {
          background-color: rgba(0, 0, 0, 0.8) !important;
          color: white !important;
          display: none; /* Hide navbar since we have our own header */
        }
        
        /* Message bubbles styling */
        .chat-wrapper :global(.Message .Bubble) {
          background-color: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(5px) !important;
          -webkit-backdrop-filter: blur(5px) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          padding: 10px 15px !important;
          line-height: 1.5 !important;
        }
        
        .chat-wrapper :global(.Message.right .Bubble) {
          background-color: rgba(0, 0, 0, 0.7) !important;
          color: white !important;
        }
        
        /* Markdown styling in bubbles */
        .chat-wrapper :global(.markdown-bubble) {
          padding: 8px 12px !important;
        }
        
        .chat-wrapper :global(.markdown-bubble p) {
          margin: 0 0 8px 0;
        }
        
        .chat-wrapper :global(.markdown-bubble p:last-child) {
          margin-bottom: 0;
        }
        
        .chat-wrapper :global(.markdown-bubble strong) {
          font-weight: 700;
        }
        
        .chat-wrapper :global(.markdown-bubble ul) {
          margin: 0;
          padding-left: 20px;
        }
        
        .chat-wrapper :global(.markdown-bubble li) {
          margin-bottom: 3px;
        }
        
        .chat-wrapper :global(.Composer) {
          background-color: rgba(255, 255, 255, 0.7) !important;
          backdrop-filter: blur(5px) !important;
          -webkit-backdrop-filter: blur(5px) !important;
          border-top: 1px solid rgba(255, 255, 255, 0.3) !important;
        }
        
        .chat-wrapper :global(.ComposerInput) {
          background-color: rgba(255, 255, 255, 0.6) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          border-radius: 20px !important;
        }
        
        .chat-wrapper :global(.SendButton) {
          background-color: #000 !important;
          border-radius: 50% !important;
          width: 32px !important;
          height: 32px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        /* Media query for mobile responsiveness */
        @media (max-width: 768px) {
          .chat-container {
            width: 90%;
            height: 70vh;
            bottom: 80px;
            right: 5%;
            left: 5%;
          }
        }
      `}</style>
    </>
  );
} 