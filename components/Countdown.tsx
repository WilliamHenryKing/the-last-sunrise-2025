import React, { useState, useEffect } from 'react';

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target: Dec 31, 2025 at 05:45 AM
    const targetDate = new Date('2025-12-31T05:45:00');

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <span className="text-2xl md:text-4xl font-mono font-bold text-white tabular-nums tracking-tight">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-400 mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-center justify-center py-4 px-6 bg-black/30 backdrop-blur-md rounded-full border border-white/10 shadow-2xl animate-in fade-in duration-1000">
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className="h-8 w-px bg-white/10" />
      <TimeUnit value={timeLeft.hours} label="Hrs" />
      <div className="h-8 w-px bg-white/10" />
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <div className="h-8 w-px bg-white/10" />
      <TimeUnit value={timeLeft.seconds} label="Sec" />
    </div>
  );
};