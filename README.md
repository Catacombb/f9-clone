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

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Vapi Integration

The "Book a Call" feature uses Vapi AI to make automated phone calls to users who request a call. Here's how it works:

1. User clicks the "Book a Call" button in the Contact section
2. A modal form pops up asking for name and phone number
3. When submitted, the form sends a request to the `/api/make-direct-call` API endpoint
4. The API endpoint uses Vapi to initiate a call to the provided phone number
5. An AI assistant introduces itself as F9 Productions and engages in conversation with the user

### Vapi Setup

To use the Vapi integration:

1. Create an account at [Vapi.ai](https://vapi.ai)
2. Get your API key from the dashboard
3. Add the API key to your `.env.local` file

## Deployment

This site is designed to be deployed on Vercel:

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Add the required environment variables
4. Deploy

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

## License

This project is for demonstration purposes only. The original design belongs to F9 Productions.
