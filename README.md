# Vite + React + TypeScript + React Router + Tailwind CSS

A modern web application starter template built with the latest tools and best practices.

## 🚀 Tech Stack

- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool and dev server
- **[React 19](https://react.dev/)** - Modern UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[ESLint](https://eslint.org/)** - Code linting and quality

## 📁 Project Structure

```
decap-cms-demo/
├── src/
│   ├── components/
│   │   └── Layout.tsx          # Main layout with navigation
│   ├── pages/
│   │   ├── Home.tsx            # Home page
│   │   ├── About.tsx           # About page
│   │   └── Contact.tsx         # Contact page with form
│   ├── App.tsx                 # Main app with routing setup
│   ├── main.tsx                # Entry point
│   └── index.css               # Tailwind CSS imports
├── public/                      # Static assets
├── tailwind.config.ts          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm, yarn, pnpm, or bun

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:5173/](http://localhost:5173/)

### Building for Production

Create an optimized production build:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 🎯 Features

- ⚡ **Fast Development** - Hot Module Replacement (HMR) with Vite
- 🎨 **Tailwind CSS** - Utility-first styling with dark mode support
- 🛣️ **React Router** - Client-side routing with multiple pages
- 📱 **Responsive Design** - Mobile-first, responsive layouts
- 🌙 **Dark Mode** - Automatic dark mode based on system preferences
- 🔒 **Type Safe** - Full TypeScript support
- 📦 **Optimized Builds** - Minified and tree-shaken production bundles

## 📄 Available Pages

- **Home** (`/`) - Landing page with call-to-action buttons
- **About** (`/about`) - Information about the project and tech stack
- **Contact** (`/contact`) - Contact form with validation

## 🎨 Customization

### Tailwind CSS

Customize Tailwind by editing `tailwind.config.ts`:

```typescript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add your customizations here
    },
  },
  plugins: [],
}
```

### Adding New Routes

1. Create a new page component in `src/pages/`
2. Import and add the route in `src/App.tsx`:

```typescript
<Route path="your-path" element={<YourPage />} />
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if this project helped you!
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
