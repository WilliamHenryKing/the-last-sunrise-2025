import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

export const SunriseReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sunriseEventSent = useRef(false);
  
  // Extended height for a slower, more deliberate animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Add spring physics to the scroll value for a "fluid" cinematic feel
  // This eliminates scroll jitter and makes the animation feel weighted
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 15,
    stiffness: 50,
    mass: 0.5
  });

  // --- ANIMATION MAPPING ---

  // 1. Background Color (Night -> Dawn -> Sunrise -> Day)
  const skyColor = useTransform(
    smoothProgress,
    [0, 0.3, 0.5, 0.8],
    ["#020617", "#1e1b4b", "#7c2d12", "#fb923c"]
  );

  // 2. Stars (Fade out as dawn approaches)
  const starsOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

  // 3. Sun Movement (Starts well below horizon, arcs up slowly)
  const sunY = useTransform(smoothProgress, [0.1, 0.8], ["150%", "30%"]);
  
  // 4. Sun Glow/Bloom (Intensifies as it crests the mountain)
  const sunBloom = useTransform(smoothProgress, [0.3, 0.6], [0.5, 1]);
  const sunScale = useTransform(smoothProgress, [0.1, 1], [0.8, 1.2]);

  // 5. Horizon Glow (The line where sun meets mountain)
  const horizonOpacity = useTransform(smoothProgress, [0.2, 0.5, 0.8], [0, 0.8, 0]);

  // 6. Text Reveal (Happens late, after sun is established)
  const textOpacity = useTransform(smoothProgress, [0.6, 0.85], [0, 1]);
  const textScale = useTransform(smoothProgress, [0.6, 1], [0.9, 1]);
  const textBlur = useTransform(smoothProgress, [0.6, 0.85], ["10px", "0px"]);

  // Notify other sections (like the video) when the sunrise is almost done to pre-start playback
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (latest >= 0.9 && !sunriseEventSent.current) {
      window.dispatchEvent(new CustomEvent('sunrise-near-complete', { detail: latest }));
      sunriseEventSent.current = true;
    }
  });

  return (
    <motion.section 
      ref={containerRef}
      style={{ backgroundColor: skyColor }}
      className="relative h-[400vh] w-full z-30"
    >
      {/* Sticky Container acts as the Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* LAYER 1: Stars */}
        <motion.div 
            style={{ opacity: starsOpacity }}
            className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" 
        />

        {/* LAYER 2: The Sun */}
        <motion.div 
          style={{ y: sunY, scale: sunScale, opacity: sunBloom }}
          className="absolute z-10 flex items-center justify-center"
        >
            {/* Core Sun */}
            <div className="w-48 h-48 md:w-80 md:h-80 rounded-full bg-gradient-to-t from-orange-400 via-yellow-200 to-white shadow-[0_0_60px_rgba(251,146,60,0.8)]" />
            
            {/* Outer Glow Halo */}
            <div className="absolute inset-0 w-full h-full rounded-full bg-orange-500/30 blur-2xl scale-150" />
            
            {/* Large Atmosphere Bloom */}
            <div className="absolute inset-0 w-full h-full rounded-full bg-yellow-500/10 blur-3xl scale-[2.5]" />
        </motion.div>

        {/* LAYER 3: Horizon Light (Behind mountains, in front of sun bottom) */}
        <motion.div 
            style={{ opacity: horizonOpacity }}
            className="absolute bottom-[30vh] w-full h-32 bg-orange-500/50 blur-[50px] z-10"
        />

        {/* LAYER 4: Mountains (Foreground Silhouette) */}
        {/* We use an SVG shape for a sharper, cleaner edge than CSS polygon */}
        <div className="absolute bottom-0 w-full h-[50vh] z-20 text-slate-950 md:scale-110 origin-bottom">
             <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                <path fill="currentColor" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
             </svg>
             {/* Subtle detail on mountain */}
             <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
        </div>
        
        {/* LAYER 5: Text Reveal (Topmost) */}
        <div className="absolute z-30 text-center px-4 -mt-20 md:-mt-40 mix-blend-overlay">
             <motion.h2 
                style={{ opacity: textOpacity, scale: textScale, filter: `blur(${textBlur})` }}
                className="text-6xl md:text-9xl cinematic-font font-black text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
             >
                2026
             </motion.h2>
             <motion.p
                style={{ opacity: textOpacity, y: 20 }}
                className="mt-6 text-lg md:text-2xl text-orange-100 font-light tracking-[0.5em] uppercase"
             >
                A New Dawn Awaits
             </motion.p>
        </div>

        {/* Scroll indicator lives here to keep video fully immersive */}
        <motion.div
          style={{ opacity: starsOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl" />
            <div className="relative px-5 py-5 flex flex-col items-center gap-2">
              <svg
                className="w-6 h-6 text-orange-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span className="text-[10px] tracking-[0.3em] uppercase text-orange-100 font-medium whitespace-nowrap">
                Scroll
              </span>
            </div>
            <div className="absolute inset-0 rounded-full bg-orange-400/10 blur-xl scale-150 pointer-events-none" />
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};
