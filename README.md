# F9 Productions Website Clone

This is a clone of the F9 Productions website homepage built with Next.js. The site is designed to be deployed on Vercel.

## Features

- Responsive design that works on mobile, tablet, and desktop
- Modern UI with animations using Framer Motion
- Component-based architecture
- Fully static site that can be easily deployed
- "Book a Call" feature with Vapi AI phone call integration

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Vapi API key (for the "Book a Call" feature)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd f9-clone
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
   - Copy `.env.local.example` to `.env.local`
   - Add your Vapi API key to `.env.local`

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Setting Up Vapi Integration

To enable the "Book a Call" feature, you need to set up a Vapi account and configure the necessary credentials:

1. Create an account at [Vapi.ai](https://app.vapi.ai)
2. Create an assistant in the Vapi dashboard:
   - Go to the Assistants section
   - Create a new assistant with appropriate settings for your use case
   - Configure the assistant with the desired voice, model, and behavior
   - Copy the Assistant ID and add it to your `.env.local` file as `VAPI_ASSISTANT_ID`

3. Set up a phone number:
   - Go to the Phone Numbers section in the Vapi dashboard
   - Create a new phone number or import an existing one
   - Copy the Phone Number ID and add it to your `.env.local` file as `VAPI_PHONE_NUMBER_ID`

4. Generate an API key:
   - Go to Settings > API Keys in the Vapi dashboard
   - Create a new API key
   - Copy the API key and add it to your `.env.local` file as `VAPI_API_KEY`

5. Restart your development server for the changes to take effect

When a user submits the "Book a Call" form, the Vapi assistant will call them at the provided phone number.

## Deployment

This project is designed to be deployed on Vercel. You can deploy it with a few clicks:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository on [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## Built With

- [Next.js](https://nextjs.org/) - The React framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Vapi](https://vapi.ai) - AI voice assistant platform

## License

This project is licensed under the MIT License.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vapi Documentation](https://docs.vapi.ai)
- [Framer Motion](https://www.framer.com/motion/)
- [Vercel Deployment](https://vercel.com/docs)

## Project Structure

- `/app` - Next.js app directory
  - `/components` - React components
  - `/assets` - Static assets
  - `/api` - API routes for backend functionality
    - `/make-call` - Endpoint for initiating Vapi phone calls
  - `globals.css` - Global CSS styles
  - `page.tsx` - Main page component
  - `layout.tsx` - Root layout component
- `/public` - Public assets (images, icons, etc.)

## Customization

To customize the website:

- Update the content in the component files
- Modify the CSS modules to change styles
- Replace the placeholder images with real images
- Add additional components as needed
- Customize the Vapi assistant's responses in the `make-call/route.ts` file
