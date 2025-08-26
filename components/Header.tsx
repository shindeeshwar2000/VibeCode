
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center p-4 md:p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2 tracking-tight">
        Interview Prep AI
      </h1>
      <p className="text-md md:text-lg text-gray-500 dark:text-gray-400">
        Enter a topic to generate expert-level questions and answers.
      </p>
    </header>
  );
};
