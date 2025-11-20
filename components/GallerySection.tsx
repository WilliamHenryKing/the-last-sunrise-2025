import React from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform, AnimatePresence } from 'framer-motion';
import { GALLERY_IMAGES } from '../constants';
import { Camera, X, Maximize2 } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const atmosphereDrift = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const [progress, setProgress] = React.useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => setProgress(latest));

  const depths = [90, 65, 45, 25, 0, -20, -35, -55, -75];

  return (
    <section ref={sectionRef} className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Atmospheric backdrops */}
      <motion.div style={{ y: atmosphereDrift }} className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black" />
        <div className="absolute inset-[-20%] bg-[radial-gradient(circle_at_30%_20%,rgba(255,140,66,0.18)_0,transparent_45%)]" />
        <div className="absolute inset-[-10%] bg-[radial-gradient(circle_at_70%_30%,rgba(94,234,212,0.14)_0,transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.05)_0,transparent_35%,transparent_65%,rgba(255,255,255,0.02)_100%)]" />
      </motion.div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4 text-orange-300">
             <Camera className="w-6 h-6" />
             <span className="uppercase tracking-[0.4em] text-xs md:text-sm">Immersive Gallery</span>
        </div>
        <h2 className="text-4xl md:text-6xl cinematic-font text-white mb-4 drop-shadow-xl">Moments on the Mountain</h2>
        <p className="text-slate-300 max-w-3xl mx-auto text-lg">
            A visual taste of what you will encounter
        </p>
      </div>

      {/* Parallax Grid */}
      <div className="relative max-w-7xl mx-auto px-4 z-10">
        <div className="absolute inset-x-0 top-0 bottom-0 mx-auto w-px bg-gradient-to-b from-white/5 via-white/15 to-white/5 opacity-60" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {GALLERY_IMAGES.map((item, index) => {
            const shift = (progress - 0.5) * depths[index % depths.length];
            const innerShift = (progress - 0.5) * (depths[index % depths.length] / 2);

            return (
              <motion.figure
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900/40 shadow-[0_40px_100px_-60px_rgba(0,0,0,0.9)] backdrop-blur interactive"
                style={{ y: shift }}
                initial={{ opacity: 0, scale: 0.96, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: shift }}
                viewport={{ amount: 0.4, margin: "-80px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
                onClick={() => setActiveIndex(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIndex(index);
                  }
                }}
              >
                <motion.div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/75 opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                  style={{ y: innerShift }}
                />

                <motion.img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-[360px] md:h-[400px] xl:h-[420px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  style={{ y: innerShift }}
                />

                <div className="absolute inset-x-0 bottom-0 p-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-orange-200/80">
                      {item.location}
                    </p>
                    <h3 className="text-2xl font-semibold text-white drop-shadow-lg">
                      {item.title}
                    </h3>
                  </div>
                  <motion.div 
                    className="w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur flex items-center justify-center text-orange-300 shadow-inner"
                    whileHover={{ rotate: -8, scale: 1.08 }}
                  >
                    <Maximize2 className="w-5 h-5" />
                  </motion.div>
                </div>

                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-cyan-400/5 mix-blend-screen" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_35%)]" />
                </div>
              </motion.figure>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-lg flex items-center justify-center px-4 py-10"
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 18, stiffness: 180 }}
              className="relative max-w-5xl w-full bg-slate-900/60 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition"
                onClick={() => setActiveIndex(null)}
                aria-label="Close full view"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative">
                <motion.img
                  key={GALLERY_IMAGES[activeIndex].title}
                  src={GALLERY_IMAGES[activeIndex].src}
                  alt={GALLERY_IMAGES[activeIndex].title}
                  className="w-full max-h-[75vh] object-contain bg-black/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.04),transparent_30%)]" />
              </div>

              <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-white/5 via-transparent to-white/5">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-orange-200/80">
                    {GALLERY_IMAGES[activeIndex].location}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-semibold text-white">
                    {GALLERY_IMAGES[activeIndex].title}
                  </h3>
                </div>
                <p className="text-slate-300 text-sm md:text-base">Tap anywhere to close</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
