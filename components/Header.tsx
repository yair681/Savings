import React from 'react';

const SavingsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.41V15c-1.3-.59-2-1.7-2-3 0-1.66 1.34-3 3-3s3 1.34 3 3c0 1.3-.7 2.41-2 3v1.41l-1.71-1.7-1.58 1.58L11 16.41zM12 7c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
        <path d="M11 15v1.41l1.29-1.29-1.58-1.58L9 15.24V15c0-1.3-.7-2.41-2-3 0-.83.34-1.58.88-2.12.33-.33.72-.59 1.12-.78v3.4c0 .83.67 1.5 1.5 1.5h.5v-1.59L11 15z" opacity=".3" />
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="text-center p-4 rounded-2xl bg-slate-800/50 shadow-lg">
      <div className="flex items-center justify-center gap-4">
        <SavingsIcon />
        <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">AI Money Saver</h1>
            <p className="mt-2 text-lg text-slate-400">שוחח עם העוזר הפיננסי האישי שלך</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
