import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "F9 Productions | Colorado Architecture Firm",
  description: "F9 Productions is a premier architecture and design firm serving all of Colorado, specializing in residential, multi-family, and commercial architecture.",
  keywords: "architecture, Colorado architects, residential architecture, commercial architecture, F9 Productions, design build",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* DHTMLX ChatBot CSS */}
        <link rel="stylesheet" href="https://cdn.dhtmlx.com/chatbot/latest/chatbot.css" />
      </head>
      <body>
        {children}
        
        {/* Chat button */}
        <button 
          id="chatbotBtn"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            fontSize: '16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 1000
          }}
          onClick={() => {
            const chatWindow = document.getElementById('chatbotWindow');
            if (chatWindow) {
              if (chatWindow.style.display === 'none') {
                chatWindow.style.display = 'block';
              } else {
                chatWindow.style.display = 'none';
              }
            }
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white"/>
          </svg>
          Chat with us
        </button>

        {/* Chat window */}
        <div 
          id="chatbotWindow" 
          style={{
            display: 'none',
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '350px',
            height: '500px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            overflow: 'hidden'
          }}
        >
          <div id="chatbot" style={{ width: '100%', height: '100%' }}></div>
        </div>
        
        {/* DHTMLX ChatBot Script */}
        <Script src="https://cdn.dhtmlx.com/chatbot/latest/chatbot.js" strategy="afterInteractive" />
        <Script id="chatbot-init" strategy="afterInteractive">
          {`
            document.addEventListener('DOMContentLoaded', function() {
              // Initialize the chatbot
              const bot = new chatbot.ChatBot("chatbot", {
                sidebar: false,
                format: "markdown",
                agents: [{
                  id: 100,
                  name: "F9 Architecture Assistant",
                  avatar: "/f9-avatar.svg"
                }]
              });

              // Function to handle responses
              const response = content => bot.addMessage({ 
                message: { 
                  role: "agent", 
                  content, 
                  typing: -1 
                }
              });

              // Add a welcome message
              bot.addMessage({
                message: {
                  role: "agent",
                  content: "Hello! I'm the F9 Productions Architecture Assistant. How can I help you today?",
                  typing: 0
                }
              });

              // Handle user messages and OpenAI integration
              bot.on("add-message", ({ message }) => {
                if (message.role !== "user") return;
                
                // Start typing animation
                const typingMessage = {
                  role: "agent",
                  content: "",
                  typing: 1
                };
                bot.addMessage({ message: typingMessage });
                
                // Prepare conversation history
                const prompt = [
                  { role: "system", content: "You are an architectural assistant for F9 Productions, a premier architecture and design firm serving Colorado. You specialize in residential, multi-family, and commercial architecture. Be helpful, professional, and provide detailed information about architectural concepts, design processes, and F9 Productions services." },
                ];
                
                const messages = bot.getConfig().messages.map(x => {
                  return {
                    role: x.role === "agent" ? "assistant" : "user",
                    content: x.content
                  };
                });

                // Call your backend API that will handle the OpenAI request
                fetch("/api/chatbot", {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    messages: prompt.concat(messages)
                  })
                })
                .then(r => {
                  if (r.status !== 200) {
                    throw new Error("Communication error with server");
                  }
                  return r.json();
                })
                .then(data => {
                  // Remove typing message
                  bot.typeMessage({ id: typingMessage.id, typing: 0 });
                  
                  // Add the response from OpenAI
                  return response(data.content);
                })
                .catch(error => {
                  // Remove typing message
                  bot.typeMessage({ id: typingMessage.id, typing: 0 });
                  
                  // Show error message
                  return response("Sorry, I encountered an error while processing your request. Please try again later.");
                });
              });
            });
          `}
        </Script>
      </body>
    </html>
  );
}
