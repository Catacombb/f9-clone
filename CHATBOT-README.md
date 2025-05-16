# F9 Productions React Chatbot Implementation

This README provides instructions on how to configure and use the React-based chatbot that has been integrated into the F9 Productions website.

## Overview

The F9 Productions website includes an AI-powered chatbot using the @chatui/core library. This chatbot is designed to provide customer support and information about F9 Productions' architectural services.

## Features

- **Floating Chat Widget**: A chat button appears on every page of the website, which opens a chat window when clicked
- **Markdown Support**: The chatbot can display rich text formatting, links, and structured content
- **Enhanced Typing Animation**: Provides a realistic typing effect while waiting for AI responses
- **Mobile-Friendly**: The chat interface is responsive and works well on mobile devices
- **Glassmorphism UI**: Modern UI with blur effects and transparency for an elegant look

## Architecture

The chatbot is implemented using a layered client component architecture to ensure compatibility with Next.js App Router:

1. **ChatbotLoader (Client Component)**: 
   - A thin client wrapper in `app/components/ChatbotLoader.tsx`
   - Uses `dynamic` import with `{ ssr: false }` to prevent server-side rendering issues
   - Referenced directly from the server component (layout.tsx)

2. **ChatbotUI (Client Component)**:
   - The main implementation in `app/components/ChatbotUI.tsx`
   - Uses React hooks for proper lifecycle management
   - Handles UI interactions and API communication

3. **API Route**:
   - Backend handler at `/api/chatbot/route.ts` to securely communicate with the LLM provider
   - Processes conversation history and returns AI-generated responses

## Customizing the System Prompt

The chatbot uses a system prompt to define its personality and knowledge base. You can customize this in the `components/ChatbotUI.tsx` file:

```javascript
const F9_SYSTEM_PROMPT = `You are the AI customer support assistant for F9 Productions, a premier architecture and design firm serving Colorado...`;
```

## Customizing the Appearance

You can customize the appearance of the chat button and window by modifying the styles in the `components/ChatbotUI.tsx` file:

- **Chat Button**: Look for the `.chat-button` styles
- **Chat Window**: Look for the `.chat-container` styles
- **Message Bubbles**: Look for the `.Message .Bubble` styles
- **Typing Animation**: Look for the `.Typing` and `.Typing-dot` styles

## Troubleshooting

If you encounter issues with the chatbot:

1. **Check the browser console** for JavaScript errors
2. **Verify API endpoint responses** (the chatbot uses `/api/chatbot` endpoint)
3. **Check for React state issues** - the typing indicator uses both local state and the library's state

## Credits

This implementation uses:

- [@chatui/core](https://github.com/alibaba/ChatUI) - A UI design language and React library for Conversational UI
- [react-markdown](https://github.com/remarkjs/react-markdown) - Markdown component for React 