
import React, { useState } from 'react';
import { Header } from './components/Header';
import { TopicForm } from './components/TopicForm';
import { QACard } from './components/QACard';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { generateInterviewQuestions } from './services/geminiService';
import { InterviewQA } from './types';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [qaPairs, setQaPairs] = useState<InterviewQA[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    setError(null);
    setQaPairs([]);
    setActiveIndex(null);

    try {
      const results = await generateInterviewQuestions(topic);
      setQaPairs(results);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const WelcomeMessage: React.FC = () => (
    <div className="text-center py-10 px-4">
        <div className="mx-auto w-16 h-16 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.624L16.5 21.75l-.398-1.126a3.375 3.375 0 00-2.456-2.456L12.5 17.25l1.126-.398a3.375 3.375 0 002.456-2.456L16.5 13.5l.398 1.126a3.375 3.375 0 002.456 2.456l1.126.398-1.126.398a3.375 3.375 0 00-2.456 2.456z" />
            </svg>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">Ready to Ace Your Interview?</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
            Provide a topic above, and our AI will craft the questions you need to practice.
        </p>
    </div>
  );

  return (
    <div className="min-h-screen font-sans text-gray-900 dark:text-gray-100 antialiased">
      <main className="container mx-auto px-4 py-8">
        <Header />
        <div className="mt-8">
          <TopicForm
            topic={topic}
            setTopic={setTopic}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && qaPairs.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Generated Questions for "{topic}"</h2>
              {qaPairs.map((qa, index) => (
                <QACard
                  key={index}
                  qa={qa}
                  isOpen={activeIndex === index}
                  onClick={() => handleCardToggle(index)}
                />
              ))}
            </div>
          )}
          {!isLoading && !error && qaPairs.length === 0 && <WelcomeMessage />}
        </div>
      </main>
    </div>
  );
};

export default App;
