import React, { useState } from 'react';

type Tab = { label: string; content: React.ReactNode };

const Tabs = ({ tabs }: { tabs: Tab[] }) => {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="flex space-x-2 border-b mb-4">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`px-4 py-2 font-semibold border-b-2 transition ${active === idx ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 dark:text-gray-300'}`}
            onClick={() => setActive(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[active].content}</div>
    </div>
  );
};

export default Tabs; 