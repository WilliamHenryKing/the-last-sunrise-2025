import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Calendar } from 'lucide-react';
import { Countdown } from './Countdown';
import HeroBackdrop from '../images/Pic1.jpg';
import HeroGlow from '../images/Pic2.webp';

export const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Animation for splitting text
  const title = "THE LAST SUNRISE";
  const letters = Array.from(title);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.5 }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center px-4 z-10 interactive">
      {/* Background Parallax Layers (local assets) */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <img 
          src={HeroBackdrop} 
          alt="Sunrise over Table Mountain" 
          className="w-full h-full object-cover object-center scale-105" 
        />
      </motion.div>

      <motion.div 
        style={{ y: y2 }} 
        className="absolute inset-0 z-0 opacity-70 mix-blend-screen"
      >
        <img 
          src={HeroGlow} 
          alt="Soft sunrise haze" 
          className="w-full h-full object-cover object-center blur-[1px]" 
        />
      </motion.div>

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/30 via-slate-950/60 to-slate-950" />

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 max-w-6xl mx-auto flex flex-col items-center gap-6"
      >
        {/* Date Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-black/40 backdrop-blur-md shadow-lg hover:border-orange-500/60 transition-colors cursor-default"
        >
            <Calendar className="w-4 h-4 text-orange-500" />
            <span className="text-orange-100 text-sm md:text-base font-bold tracking-widest uppercase">
                December 31, 2025
            </span>
        </motion.div>

        {/* Staggered Title */}
        <motion.h1 
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-8xl lg:text-9xl font-black cinematic-font flex flex-wrap justify-center gap-x-4 md:gap-x-8 leading-none drop-shadow-2xl"
        >
          {title.split(" ").map((word, index) => (
            <div key={index} className="flex">
              {Array.from(word).map((letter, idx) => (
                <motion.span variants={child} key={idx} className="bg-clip-text text-transparent bg-gradient-to-b from-purple-100 via-white to-slate-400">
                  {letter}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-lg md:text-2xl text-purple-100/80 tracking-[0.2em] uppercase drop-shadow-md max-w-2xl"
        >
          Reflect on the year that was
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: "spring" }}
          className="mt-8"
        >
          <Countdown />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="absolute bottom-[-120px] md:bottom-[-160px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs tracking-widest text-slate-400"
        >
            <span className="animate-pulse">BEGIN THE ASCENT</span>
            <ChevronDown className="w-6 h-6 animate-bounce text-orange-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};
