import React from 'react';
import { HeroSection } from './components/HeroSection';
import { MountainClimb } from './components/MountainClimb';
import { InfoGrid } from './components/InfoGrid';
import { SunriseReveal } from './components/SunriseReveal';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { CustomCursor } from './components/CustomCursor';
import VideoSection from './components/VideoSection';

const App: React.FC = () => {
  return (
    <main className="bg-slate-950 text-white min-h-screen w-full selection:bg-orange-500 selection:text-white cursor-none">
      <CustomCursor />
      
      {/* Fixed Overlay Gradient for atmospheric depth */}
      <div className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      
      <HeroSection />
      
      {/* Section Divider */}
      <div className="h-24 bg-gradient-to-b from-slate-950 to-slate-950 relative z-20" />
      
      <MountainClimb />
      
      <InfoGrid />

      <GallerySection />
      
      <SunriseReveal />

      <VideoSection />

      <div className="h-[50vh] flex items-center justify-center bg-slate-950 relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 bg-[url('https://file.notion.so/f/f/42a0a323-e065-455d-9a2f-c923c5431d47/24f11a57-6a36-496f-8570-f5866781f776/table_mountain_cable_car_sunset.jpg?id=a56e4c2d-79c4-4a8c-9d0e-152396f9701e&table=block&spaceId=42a0a323-e065-455d-9a2f-c923c5431d47&expirationTimestamp=1740945600000&signature=--s')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
          <div className="relative z-10 text-center px-6">
            <p className="text-sm text-orange-400 tracking-[0.3em] uppercase mb-4 drop-shadow-md">End of the Year</p>
            <h2 className="text-3xl md:text-5xl cinematic-font text-slate-100 drop-shadow-xl">See you on the mountain.</h2>
          </div>
      </div>

      <Footer />
    </main>
  );
};

export default App;