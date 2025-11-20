import React, { useState } from 'react';
import { Check, Circle } from 'lucide-react';
import { PACKING_LIST } from '../constants';

export const PackingList: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setCheckedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400 mb-4 italic">Click to pack your bag</p>
      <div className="grid grid-cols-1 gap-3">
        {PACKING_LIST.map((item) => {
          const isChecked = checkedItems.includes(item.id);
          return (
            <div 
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`
                group flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all duration-300 interactive
                ${isChecked 
                  ? 'bg-emerald-900/20 border-emerald-500/30' 
                  : 'bg-white/5 border-white/5 hover:bg-white/10'}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-5 h-5 rounded-full flex items-center justify-center transition-colors
                  ${isChecked ? 'bg-emerald-500 text-black' : 'border border-slate-500 text-transparent'}
                `}>
                  <Check className="w-3 h-3" strokeWidth={4} />
                </div>
                <span className={`
                  text-sm font-medium transition-all
                  ${isChecked ? 'text-slate-500 line-through' : 'text-slate-200'}
                `}>
                  {item.item}
                </span>
              </div>
              {item.important && !isChecked && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500 bg-orange-500/10 px-2 py-1 rounded">
                  Vital
                </span>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Completion Message */}
      <div className={`
        mt-4 text-center transition-all duration-500 overflow-hidden
        ${checkedItems.length === PACKING_LIST.length ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest animate-pulse">
          You are ready.
        </p>
      </div>
    </div>
  );
};