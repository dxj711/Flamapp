import React from 'react';

const Modal = ({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
      <div className="relative bg-white/80 dark:bg-gray-900/80 border border-blue-100 dark:border-gray-800 rounded-2xl shadow-2xl p-8 min-w-[320px] animate-fadeIn">
        <button className="absolute top-3 right-3 text-xl text-gray-400 hover:text-amber-500" onClick={onClose} aria-label="Close">✕</button>
        {children}
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
};

export default Modal; 