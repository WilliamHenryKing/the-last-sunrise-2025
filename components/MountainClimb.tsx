import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';

export const MountainClimb: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  // Smooth the scroll for more cinematic easing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 18,
    mass: 0.7
  });

  // Environment transforms
  const skyBlend = useTransform(
    smoothProgress,
    [0, 0.35, 0.7, 1],
    [
      "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.25), rgba(2,6,23,1) 45%), linear-gradient(180deg,#020617 0%, #0b1120 60%, #0b1120 100%)",
      "radial-gradient(circle at 30% 20%, rgba(251,146,60,0.18), rgba(2,6,23,1) 48%), linear-gradient(180deg,#0f172a 0%, #0b1120 60%, #0b1120 100%)",
      "radial-gradient(circle at 45% 20%, rgba(251,146,60,0.25), rgba(6,2,26,1) 55%), linear-gradient(180deg,#1f172a 0%, #0f172a 60%, #0b1120 100%)",
      "radial-gradient(circle at 55% 20%, rgba(251,146,60,0.35), rgba(8,47,73,1) 55%), linear-gradient(180deg,#7c2d12 0%, #0f172a 60%, #020617 100%)"
    ]
  );
  const starsOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const auroraShift = useTransform(smoothProgress, [0, 1], ["0%", "-36%"]);
  const yMountain = useTransform(smoothProgress, [0, 1], ["0%", "28%"]);
  const hazeOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.25, 0.55, 0.35]);
  const summitGlow = useTransform(smoothProgress, [0.45, 0.92], [0, 1]);
  const pathLengthProgress = useTransform(smoothProgress, [0, 0.92], [0, 1]);
  const fadeOut = useTransform(smoothProgress, [0.85, 1], [1, 0]);

  // Path and figure motion values
  const hikerX = useMotionValue(0);
  const hikerY = useMotionValue(0);

  // Create a more dramatic zig-zag climb
  const pathD =
    "M60 780 C 180 700 260 610 340 560 C 420 510 520 470 600 430 C 690 385 800 330 900 250 C 1020 155 1200 160 1290 120";

  useEffect(() => {
    const unsub = smoothProgress.on("change", (value) => {
      const path = pathRef.current;
      if (!path) return;
      const length = path.getTotalLength();
      const clamped = Math.max(0, Math.min(value, 0.92));
      const point = path.getPointAtLength(length * (clamped / 0.92));
      hikerX.set(point.x);
      hikerY.set(point.y);
    });
    return unsub;
  }, [smoothProgress, hikerX, hikerY]);

  return (
    <section ref={containerRef} className="relative min-h-[130vh] md:min-h-[140vh] w-full overflow-hidden bg-slate-950">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Sky & stars */}
        <motion.div style={{ background: skyBlend }} className="absolute inset-0 z-0" />
        <motion.div
          style={{ opacity: starsOpacity }}
          className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-screen"
        />

        {/* Aurora sweeps */}
        <motion.div
          style={{ y: auroraShift }}
          className="absolute inset-x-0 top-10 md:top-0 h-[120%] z-[5] opacity-60"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/10 via-orange-400/15 to-transparent blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-pink-400/10 to-transparent blur-3xl translate-y-20" />
        </motion.div>

        {/* Mountain */}
        <motion.div
          style={{ y: yMountain }}
          className="absolute bottom-0 left-0 right-0 h-full z-10 flex items-end justify-center"
        >
          <img
            src="https://file.notion.so/f/f/42a0a323-e065-455d-9a2f-c923c5431d47/07461699-a983-4f82-a4be-77b675d138cb/platteklip_gorge_hike.jpg?id=b0596223-411c-4964-b2c2-958150062118&table=block&spaceId=42a0a323-e065-455d-9a2f-c923c5431d47&expirationTimestamp=1740945600000&signature=--s"
            alt="Platteklip Gorge Hike"
            className="w-full h-[120%] object-cover object-center opacity-65 brightness-90 grayscale-[25%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60" />
        </motion.div>

        {/* Summit glow */}
        <motion.div
          style={{ opacity: summitGlow }}
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full bg-orange-400/25 blur-[120px] z-10"
        />

        {/* Copy + beats */}
        <div className="absolute inset-0 z-30 flex items-center justify-between px-6 md:px-14">
          <div className="space-y-6 max-w-xl drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            <motion.p
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 0.9, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-sm uppercase tracking-[0.4em] text-orange-300/80"
            >
              Platteklip Gorge — Dawn Hike
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-4xl md:text-6xl cinematic-font text-white"
            >
              The Ascent
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="h-1 w-24 origin-left bg-gradient-to-r from-orange-500 via-amber-400 to-amber-200 rounded-full shadow-[0_0_20px_rgba(251,146,60,0.8)]"
            />

            <div className="space-y-4">
              <Beat
                title="Base Camp"
                body="05:45 - Streetlights are still on. The city is asleep; but we are awake."
                start={0}
                end={0.3}
                progress={smoothProgress}
              />
              <Beat
                title="Switchbacks"
                body="06:20 - Our legs burn, lungs open. The top look closer and farther at the same time."
                start={0.26}
                end={0.62}
                progress={smoothProgress}
              />
              <Beat
                title="Breaking Through"
                body="07:10 - Sky goes ember. We see Table Mountain's golden edges as the sun goes up."
                start={0.55}
                end={0.9}
                progress={smoothProgress}
              />
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-4 text-right max-w-sm text-orange-50/80">
            <StatChip label="Elevation Gain" value="760 m" />
            <StatChip label="Gradient" value="Steep, relentless" />
            <StatChip label="Pace" value="One controlled push" />
          </div>
        </div>

        {/* Path + hiker */}
        <motion.div
          style={{ opacity: fadeOut }}
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        >
          <svg className="w-[95%] h-[95%] max-w-5xl opacity-95" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fb923c" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#fb923c" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="trailGlow" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#fb923c" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            <motion.path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="14 18"
              style={{ pathLength: pathLengthProgress, filter: "drop-shadow(0 0 12px rgba(251,146,60,0.7))" }}
            />
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#trailGlow)"
              strokeWidth="18"
              strokeLinecap="round"
              style={{ opacity: hazeOpacity }}
              className="blur-[40px]"
            />

            <ClimbingFigure x={hikerX} y={hikerY} />
          </svg>
        </motion.div>

        {/* Foreground mist */}
        <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-slate-950 to-transparent z-30" />
      </div>
    </section>
  );
};

const ClimbingFigure = ({ x, y }: { x: ReturnType<typeof useMotionValue>; y: ReturnType<typeof useMotionValue> }) => (
  <motion.g style={{ x, y }} className="text-orange-400">
    <motion.circle
      cx="0"
      cy="0"
      r="8"
      fill="currentColor"
      className="shadow-[0_0_25px_#f97316]"
      animate={{ scale: [1, 1.12, 1] }}
      transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
    />
    <line x1="0" y1="8" x2="0" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <line x1="0" y1="16" x2="-8" y2="26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <line x1="0" y1="16" x2="10" y2="26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <motion.circle
      cx="0"
      cy="-10"
      r="6"
      fill="currentColor"
      animate={{ y: [-1, 1, -1] }}
      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 0.2 }}
    />
  </motion.g>
);

const Beat = ({
  title,
  body,
  start,
  end,
  progress
}: {
  title: string;
  body: string;
  start: number;
  end: number;
  progress: ReturnType<typeof useSpring>;
}) => {
  const opacity = useTransform(progress, [start, (start + end) / 2, end], [1, 1, 0.2]);
  const y = useTransform(progress, [start, end], [20, -10]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 shadow-[0_10px_50px_rgba(0,0,0,0.35)]"
    >
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.9)]" />
        <p className="text-sm uppercase tracking-wide text-orange-100/80">{title}</p>
      </div>
      <p className="mt-2 text-lg text-slate-100 leading-relaxed">{body}</p>
    </motion.div>
  );
};

const StatChip = ({ label, value }: { label: string; value: string }) => (
  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
    <p className="text-xs uppercase tracking-[0.2em] text-orange-200/70">{label}</p>
    <p className="text-lg text-white font-semibold">{value}</p>
  </div>
);
