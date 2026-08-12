import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
        About This Project
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          This is a modern web application starter template featuring:
        </p>
        <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-8">
          <li className="flex items-start">
            <span className="mr-2">⚡</span>
            <span><strong>Vite</strong> - Lightning fast build tool and dev server</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">⚛️</span>
            <span><strong>React 19</strong> - Modern UI library with latest features</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">📘</span>
            <span><strong>TypeScript</strong> - Type-safe development experience</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🛣️</span>
            <span><strong>React Router</strong> - Client-side routing solution</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🎨</span>
            <span><strong>Tailwind CSS</strong> - Utility-first CSS framework</span>
          </li>
        </ul>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
