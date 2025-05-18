'use client';

import React from 'react';
import { useAppSelector } from '../redux';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const ErrorComponent = ({ error, reset }: ErrorProps) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkModeOn);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gray-100 p-8 dark:bg-dark-primary">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-dark-secondary">
        <div className="mb-6 flex items-center justify-center">
          <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/50">
            <svg
              className="h-6 w-6 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Something went wrong!
        </h2>

        <div className="mb-6 rounded-md bg-red-50 p-4 dark:bg-red-900/50">
          <p className="text-sm text-red-700 dark:text-red-300">
            {error.message || 'An unexpected error occurred'}
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={reset}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Try again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Go back home
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>If the problem persists, please contact support.</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent; 