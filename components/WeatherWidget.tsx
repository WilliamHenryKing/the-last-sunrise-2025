import React from 'react';
import { CloudSun, Wind, ThermometerSun, Sunrise } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/20 flex flex-col items-center justify-center text-center">
        <ThermometerSun className="w-6 h-6 text-orange-400 mb-2" />
        <span className="text-2xl font-bold text-white">18°C</span>
        <span className="text-xs text-slate-400 uppercase">Summit Temp</span>
      </div>
      
      <div className="bg-slate-800/40 p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center">
        <Wind className="w-6 h-6 text-blue-300 mb-2" />
        <span className="text-2xl font-bold text-white">15<span className="text-sm font-normal">km/h</span></span>
        <span className="text-xs text-slate-400 uppercase">SE Wind</span>
      </div>

      <div className="bg-slate-800/40 p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center">
        <Sunrise className="w-6 h-6 text-yellow-400 mb-2" />
        <span className="text-2xl font-bold text-white">05:32</span>
        <span className="text-xs text-slate-400 uppercase">First Light</span>
      </div>

      <div className="bg-slate-800/40 p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center">
        <CloudSun className="w-6 h-6 text-slate-300 mb-2" />
        <span className="text-lg font-bold text-white">Clear</span>
        <span className="text-xs text-slate-400 uppercase">Visibility</span>
      </div>
    </div>
  );
};