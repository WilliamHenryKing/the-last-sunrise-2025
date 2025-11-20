import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || 
          (e.target as HTMLElement).tagName === 'BUTTON' ||
          (e.target as HTMLElement).closest('.interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main Torch Light */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div className="w-8 h-8 bg-orange-500/40 rounded-full blur-md" />
      </motion.div>

      {/* Wide Glow (Atmosphere) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-screen hidden md:block"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 50 }}
      >
        <div className="w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-3xl" />
      </motion.div>
    </>
  );
};