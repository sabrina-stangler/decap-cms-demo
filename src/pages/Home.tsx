import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6">
        Welcome to Vite + React
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl text-center">
        A modern web application built with Vite, React, TypeScript, React Router, and Tailwind CSS
      </p>
      <div className="flex gap-4">
        <Link 
          to="/about" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Learn More
        </Link>
        <Link 
          to="/contact" 
          className="px-6 py-3 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
