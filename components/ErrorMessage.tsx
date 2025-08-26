
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="max-w-2xl mx-auto my-8 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 rounded-lg" role="alert">
      <strong className="font-bold">Oops! </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
