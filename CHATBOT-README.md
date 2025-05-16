# F9 Productions DHTMLX Chatbot Implementation

This README provides instructions on how to configure and use the DHTMLX Chatbot that has been integrated into the F9 Productions website.

## Overview

The F9 Productions website now includes an AI-powered chatbot using the DHTMLX Chatbot widget. This chatbot is integrated with OpenRouter, which provides access to various AI models including OpenAI GPT, Anthropic Claude, Google Gemini, and more.

## Features

- **Embedded Chat Widget**: A chat button appears on every page of the website, which opens a chat window when clicked
- **Multiple AI Models**: Support for various AI models through OpenRouter, including Claude, GPT-4, Gemini, and more
- **Markdown Support**: The chatbot can display rich text formatting, links, and structured content
- **Typing Animation**: Provides a realistic typing effect when the AI is generating responses
- **Mobile-Friendly**: The chat interface is responsive and works well on mobile devices

## Configuration

### OpenRouter API Key

To make the chatbot fully functional, you need to configure your OpenRouter API key:

1. Sign up for an account at [OpenRouter](https://openrouter.ai)
2. Get an API key from [OpenRouter's keys page](https://openrouter.ai/keys)
3. Open the `.env.local` file in the root directory
4. Add your OpenRouter API key:
   ```
   OPENROUTER_API_KEY=your_openrouter_key_here
   ```

### Setting the AI Model

You can configure which AI model to use by setting the `OPENROUTER_MODEL` environment variable in `.env.local`:

```
OPENROUTER_MODEL=anthropic/claude-3-opus
```

Available models include:
- `anthropic/claude-3-opus` - Anthropic's most powerful model
- `anthropic/claude-3-sonnet` - A good balance of capabilities and cost
- `anthropic/claude-3-haiku` - Fast and cost-effective
- `openai/gpt-4o` - OpenAI's latest model
- `google/gemini-pro` - Google's Gemini Pro model
- Many free and open-source models (add `:free` suffix to use free tier)

For a complete list of available models, visit [OpenRouter's models page](https://openrouter.ai/docs#models).

### Customizing the System Prompt

The chatbot uses a system prompt to define its personality and knowledge base. You can customize this in the `components/ChatbotWidget.tsx` file:

```javascript
const prompt = [
  { role: "system", content: "You are an architectural assistant for F9 Productions, a premier architecture and design firm serving Colorado. You specialize in residential, multi-family, and commercial architecture. Be helpful, professional, and provide detailed information about architectural concepts, design processes, and F9 Productions services." },
];
```

Feel free to modify this prompt to better suit your specific needs and branding.

### Customizing the Appearance

You can customize the appearance of the chat button and window by modifying the styles in the `components/ChatbotWidget.tsx` file:

- **Chat Button**: Look for the `chatbotBtn` element and modify its style properties
- **Chat Window**: Look for the `chatbotWindow` element and modify its style properties
- **Avatar**: Replace the `/public/f9-avatar.svg` file with your own company logo or avatar

## Implementation Architecture

The chatbot is implemented using a layered client component architecture to ensure compatibility with Next.js 13+ App Router:

1. **ChatbotLoader (Client Component)**: 
   - A thin client wrapper in `app/components/ChatbotLoader.tsx`
   - Uses `dynamic` import with `{ ssr: false }` to prevent server-side rendering issues
   - Referenced directly from the server component (layout.tsx)

2. **ChatbotWidget (Client Component)**:
   - The main implementation in `app/components/ChatbotWidget.tsx`
   - Uses React hooks (`useState`, `useEffect`, `useRef`) for proper lifecycle management
   - Handles script loading, UI interactions, and API communication

3. **API Route**:
   - Backend handler at `/api/chatbot/route.ts` to securely communicate with OpenRouter
   - Processes conversation history and returns AI-generated responses

This architecture ensures that client-side code (event handlers, DOM manipulation) is properly separated from server components, avoiding build errors with Next.js.

## Standalone Chatbot Page

A standalone chatbot page is also available at `/chatbot.html`. This page features a full-screen chat interface that can be linked to from any part of your website.

## Troubleshooting

If the chatbot is not working properly, check the following:

1. **API Key**: Ensure your OpenRouter API key is correctly set in the `.env.local` file
2. **Console Errors**: Check the browser console for any JavaScript errors
3. **Server Logs**: Check the server logs for any backend errors related to the OpenRouter API
4. **Network Requests**: Use the browser's developer tools to check network requests to the `/api/chatbot` endpoint

### Common Issues

- **Undefined window object**: If you see errors related to `window is undefined`, check that the ChatbotWidget component is only being rendered client-side
- **API rate limiting**: Some models may have rate limits; check for 429 status codes in your network requests
- **Model availability**: Some models may be temporarily unavailable; try switching to a different model

## Benefits of Using OpenRouter

- **Model Redundancy**: If one model is down, OpenRouter can automatically fall back to alternatives
- **Cost Optimization**: OpenRouter can route to the most cost-effective provider for your needs
- **Model Variety**: Access to a wide range of models without needing separate API keys
- **Free Tier**: Some models have a free tier with `:free` suffix in the model name

## Credits

This implementation uses:

- [DHTMLX Chatbot](https://dhtmlx.com/docs/products/dhtmlxChatbot/) - A customizable JavaScript chatbot widget (MIT License)
- [OpenRouter](https://openrouter.ai/) - A unified API for accessing various AI models
- Various AI models from providers like Anthropic, OpenAI, Google, and more

## License

The DHTMLX Chatbot widget is available under the MIT license, allowing you to implement it in any project and app without limitations. 