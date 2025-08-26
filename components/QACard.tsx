
import React from 'react';
import { InterviewQA } from '../types';

interface QACardProps {
  qa: InterviewQA;
  isOpen: boolean;
  onClick: () => void;
}

const ChevronIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

export const QACard: React.FC<QACardProps> = ({ qa, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4 bg-white dark:bg-gray-800 shadow-md transition-shadow duration-300 hover:shadow-lg">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-5 text-left text-lg font-semibold text-gray-800 dark:text-white focus:outline-none"
      >
        <span className="flex-1 pr-4">{qa.question}</span>
        <ChevronIcon isOpen={isOpen} />
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="p-5 pt-0">
          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
            {qa.answer}
          </p>
        </div>
      </div>
    </div>
  );
};
