'use client';

import React from 'react';
import { useAppSelector } from '../redux';

const LoadingComponent = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkModeOn);

  return (
    <div className="h-full w-full bg-gray-100 p-8 dark:bg-dark-primary">
      <div className="mb-8">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="mt-2 h-4 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Form Skeleton */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-dark-secondary">
          <div className="mb-6 h-6 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="space-y-4">
            <div>
              <div className="mb-2 h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-10 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div>
              <div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-32 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div className="flex justify-end">
              <div className="h-10 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>

        {/* Notes List Skeleton */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-dark-secondary">
          <div className="mb-6 h-6 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="h-5 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-8 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-8 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent; 