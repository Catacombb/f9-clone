# F9 Productions Website Clone

This is a clone of the F9 Productions website homepage built with Next.js. The site is designed to be deployed on Vercel.

## Features

- Responsive design that works on mobile, tablet, and desktop
- Modern UI with animations using Framer Motion
- Component-based architecture
- Fully static site that can be easily deployed

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

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

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `/app` - Next.js app directory
  - `/components` - React components
  - `/assets` - Static assets
  - `globals.css` - Global CSS styles
  - `page.tsx` - Main page component
  - `layout.tsx` - Root layout component
- `/public` - Public assets (images, icons, etc.)

## Deployment to Vercel

The easiest way to deploy this website is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a Git repository (GitHub, GitLab, BitBucket)
2. Import the project to Vercel
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Select your Git repository
   - Click "Import"
3. Configure your project settings if needed
4. Click "Deploy"

Vercel will automatically build and deploy your site. Once deployed, you'll get a URL where your site is live.

## Customization

To customize the website:

- Update the content in the component files
- Modify the CSS modules to change styles
- Replace the placeholder images with real images
- Add additional components as needed

## License

This project is for demonstration purposes only. The original design belongs to F9 Productions.
