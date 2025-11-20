import React from 'react';
import { Mountain } from 'lucide-react';

export const Footer: React.FC = () => {
  const brandClass =
    'text-[#7cffd4] drop-shadow-[0_0_10px_rgba(124,255,212,0.6)] font-semibold';

  return (
    <footer className="bg-black py-12 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center space-y-6">
        <Mountain className="w-12 h-12 text-slate-600" strokeWidth={1} />
        <p className="text-slate-500 text-sm tracking-widest uppercase">
          Hosted by <span className={brandClass}>Just Hike Group</span>
          <br />
          Safety is your own responsibility. Hike at your own risk.
        </p>
        <p className="text-slate-700 text-xs">
          c 2025 <span className={brandClass}>Just Hike Group</span>
        </p>
      </div>
    </footer>
  );
};
