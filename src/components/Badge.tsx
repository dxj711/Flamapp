import React from 'react';

const colorMap: Record<string, string> = {
  blue: 'from-blue-400 to-blue-600 text-white',
  green: 'from-emerald-400 to-emerald-600 text-white',
  yellow: 'from-amber-300 to-amber-500 text-gray-900',
  red: 'from-rose-400 to-rose-600 text-white',
  gold: 'from-amber-400 to-yellow-300 text-yellow-900',
};

const Badge = ({ children, color = 'blue' }: { children: React.ReactNode; color?: string }) => (
  <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${colorMap[color] || colorMap.blue} shadow-md border border-white/30 dark:border-gray-900/30`}> 
    {children}
  </span>
);

export default Badge; 