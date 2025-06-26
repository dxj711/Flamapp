import React from 'react';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  [key: string]: unknown;
}) => {
  const base = 'px-5 py-2 rounded-full font-semibold focus:outline-none focus:ring transition-all duration-200 shadow-md font-gothic'; // Added default Century Gothic here

  const variants = {
    primary:
      'bg-gradient-to-r from-amber-400 via-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-amber-400 hover:scale-105 transition-transform rounded-lg',
    secondary:
      'bg-white/80 dark:bg-gray-700/80 text-blue-700 dark:text-white border border-blue-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors rounded-lg',
  };

  // 🎩 Conditional Luxury Overrides (e.g., for 'Promote' or 'Bookmark')
  let luxuryClass = '';
  let luxuryStyle = {};

  if (typeof children === 'string') {
    const text = children.toLowerCase();
    if (text.includes('promote')) {
      luxuryClass = 'text-[#FFD700] font-playfair'; // Gold + Playfair
      luxuryStyle = { fontFamily: 'Playfair Display, serif' };
    } else if (text.includes('bookmark')) {
      luxuryClass = 'text-[#2563eb] font-playfair'; // Blue + Playfair
      luxuryStyle = { fontFamily: 'Playfair Display, serif' };
    }
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${luxuryClass}`}
      style={luxuryStyle}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
