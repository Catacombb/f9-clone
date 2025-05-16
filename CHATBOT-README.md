# F9 Productions DHTMLX Chatbot Implementation

This README provides instructions on how to configure and use the DHTMLX Chatbot that has been integrated into the F9 Productions website.

## Overview

The F9 Productions website now includes an AI-powered chatbot using the DHTMLX Chatbot widget. This chatbot is integrated with OpenAI's API to provide intelligent responses about architectural services, design concepts, and other information related to F9 Productions.

## Features

- **Embedded Chat Widget**: A chat button appears on every page of the website, which opens a chat window when clicked
- **AI-Powered Responses**: The chatbot uses OpenAI's GPT models to generate intelligent and context-aware responses
- **Markdown Support**: The chatbot can display rich text formatting, links, and structured content
- **Typing Animation**: Provides a realistic typing effect when the AI is generating responses
- **Mobile-Friendly**: The chat interface is responsive and works well on mobile devices

## Configuration

### OpenAI API Key

To make the chatbot fully functional, you need to configure your OpenAI API key:

1. Get an API key from [OpenAI's platform](https://platform.openai.com/api-keys)
2. Open the `.env.local` file in the root directory
3. Replace `your_openai_api_key_here` with your actual OpenAI API key:
   ```
   OPENAI_API_KEY=your_actual_key_here
   ```

### Customizing the System Prompt

The chatbot uses a system prompt to define its personality and knowledge base. You can customize this in the `layout.tsx` file:

```javascript
const prompt = [
  { role: "system", content: "You are an architectural assistant for F9 Productions, a premier architecture and design firm serving Colorado. You specialize in residential, multi-family, and commercial architecture. Be helpful, professional, and provide detailed information about architectural concepts, design processes, and F9 Productions services." },
];
```

Feel free to modify this prompt to better suit your specific needs and branding.

### Customizing the Appearance

You can customize the appearance of the chat button and window by modifying the styles in the `layout.tsx` file:

- **Chat Button**: Look for the `chatbotBtn` element and modify its style properties
- **Chat Window**: Look for the `chatbotWindow` element and modify its style properties
- **Avatar**: Replace the `/public/f9-avatar.svg` file with your own company logo or avatar

## Standalone Chatbot Page

A standalone chatbot page is also available at `/chatbot.html`. This page features a full-screen chat interface that can be linked to from any part of your website.

## Troubleshooting

If the chatbot is not working properly, check the following:

1. **API Key**: Ensure your OpenAI API key is correctly set in the `.env.local` file
2. **Console Errors**: Check the browser console for any JavaScript errors
3. **Server Logs**: Check the server logs for any backend errors related to the OpenAI API
4. **Network Requests**: Use the browser's developer tools to check network requests to the `/api/chatbot` endpoint

## Credits

This implementation uses:

- [DHTMLX Chatbot](https://dhtmlx.com/docs/products/dhtmlxChatbot/) - A customizable JavaScript chatbot widget (MIT License)
- [OpenAI API](https://platform.openai.com/) - For generating AI responses

## License

The DHTMLX Chatbot widget is available under the MIT license, allowing you to implement it in any project and app without limitations. 