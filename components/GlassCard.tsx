import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={`
        relative overflow-hidden rounded-2xl border border-white/10 
        bg-white/5 backdrop-blur-md shadow-2xl 
        hover:bg-white/10 transition-colors duration-300
        ${className}
      `}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-50" />
      {children}
    </motion.div>
  );
};