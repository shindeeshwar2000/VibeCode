
import React from 'react';

interface TopicFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const SparkleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 2zM3.5 5.25a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75zM12.25 4.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5a.75.75 0 01.75-.75zM10 12a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 12zM3.5 14.75a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75zM12.25 14.25a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
        <path d="M5 10a5 5 0 1010 0 5 5 0 00-10 0z" />
    </svg>
);

export const TopicForm: React.FC<TopicFormProps> = ({ topic, setTopic, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., React Hooks, Python Data Structures, System Design..."
          className="w-full px-5 py-3 text-gray-700 dark:text-gray-200 bg-transparent focus:outline-none placeholder-gray-400 dark:placeholder-gray-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="flex items-center justify-center w-full sm:w-auto px-6 py-3 text-white font-semibold rounded-full bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300 disabled:bg-gray-400 disabled:dark:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            'Generating...'
          ) : (
            <>
                <SparkleIcon />
                Generate
            </>
          )}
        </button>
      </div>
    </form>
  );
};
