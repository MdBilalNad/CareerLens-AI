import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  navigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ navigate }) => {
  return (
    <div className="py-20 text-center max-w-md mx-auto space-y-4">
      <div className="font-mono text-sm text-neutral-400">Error 404</div>
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Page not found
      </h1>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
        The requested address does not exist or may have been relocated.
      </p>
      <div className="pt-2">
        <button
          onClick={() => navigate('/')}
          className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1.5"
        >
          <ArrowLeft size={13} />
          <span>Return to home</span>
        </button>
      </div>
    </div>
  );
};
