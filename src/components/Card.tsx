import React from 'react';

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 border border-blue-100 dark:border-gray-800 rounded-2xl shadow-2xl p-4 transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
    {children}
  </div>
);

export default Card; 