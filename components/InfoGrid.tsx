import React from 'react';
import { Clock, TrendingUp, Ticket, Coffee, MapPin, ExternalLink, Map, Cloud, Backpack } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { CABLE_CAR_PRICES, MENU_SPECIALS, HIKE_SCHEDULE } from '../constants';
import { PackingList } from './PackingList';
import { WeatherWidget } from './WeatherWidget';

export const InfoGrid: React.FC = () => {
  return (
    <section className="relative -mt-32 md:-mt-40 w-full pt-24 pb-24 px-4 md:px-10 bg-slate-950 overflow-hidden z-30">
      {/* Ambient Background Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* --- HEADER (Full Width) --- */}
        <div className="col-span-1 lg:col-span-12 text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl cinematic-font text-white mb-4">Expedition Details</h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
        </div>

        {/* --- ROW 1: Map & Timeline --- */}
        
        {/* Map Info (Span 7) */}
        <GlassCard className="p-6 md:p-8 flex flex-col gap-5 lg:col-span-7 h-full">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 text-blue-400">
              <MapPin className="w-8 h-8" />
              <h3 className="text-2xl font-bold uppercase tracking-wider text-white">The Gathering Point</h3>
            </div>
            <p className="text-slate-300 text-lg">
              Base of <span className="text-white font-semibold">Platteklip Gorge</span>.
              <br />
              <span className="text-sm text-slate-400">31st December 2025. Meet at 05:45 AM.</span>
            </p>
          </div>

          <div className="w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 relative group interactive flex-grow">
            <div className="absolute inset-0 pointer-events-none group-hover:pointer-events-none border-[1px] border-white/10 group-hover:border-orange-500/50 transition-all z-10 rounded-xl" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4072.169377107506!2d18.4157838!3d-33.95538489999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc678df61a6cff%3A0xf8569aef98d98beb!2sPlatteklip%20Gorge%20Starting%20Point!5e1!3m2!1sen!2sza!4v1763540992636!5m2!1sen!2sza"
              width="100%"
              style={{ border: 0, height: '100%', minHeight: '320px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full grayscale hover:grayscale-0 transition-all duration-700 ease-in-out opacity-90 hover:opacity-100"
              title="Platteklip Gorge Map"
            ></iframe>
          </div>

          <div className="flex justify-end mt-2">
            <a
              href="https://maps.app.goo.gl/M3VS6qeQXsV2EGvQ7"
              target="_blank"
              rel="noopener noreferrer"
              className="interactive flex items-center gap-2 text-xs text-blue-300 hover:text-orange-300 uppercase tracking-widest border-b border-blue-400/30 hover:border-orange-300/50 pb-0.5 transition-all"
            >
              Open in Google Maps <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </GlassCard>

        {/* Timeline (Span 5) */}
        <GlassCard className="p-8 lg:col-span-5 h-full">
          <div className="flex items-center gap-4 mb-6 text-orange-400">
            <Clock className="w-8 h-8" />
            <h3 className="text-2xl font-bold uppercase tracking-wider text-white">Timeline (for the fast hikers)</h3>
          </div>
          <div className="space-y-8 relative pl-4 border-l border-white/10">
            {HIKE_SCHEDULE.map((event, idx) => (
              <div key={idx} className="relative pl-8">
                <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-slate-900 border border-orange-500" />
                <h4 className="text-xl font-bold text-white">{event.time}</h4>
                <p className="text-orange-200 font-medium">{event.title}</p>
                <p className="text-slate-400 text-sm mt-1">{event.description}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* --- ROW 2: Route & Packing (Tall Items) --- */}

        {/* Route Guide (Span 7) - Moved here to match Packing List height */}
        <GlassCard className="p-6 md:p-8 lg:col-span-7 h-full" delay={0.15}>
          <div className="flex items-center gap-4 mb-4 text-emerald-500">
            <Map className="w-8 h-8" />
            <h3 className="text-2xl font-bold uppercase tracking-wider text-white">Route Guide</h3>
          </div>
          <div className="w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 interactive">
            <iframe
              className="alltrails w-full h-[400px] grayscale-[30%] hover:grayscale-0 transition-all duration-500"
              src="https://www.alltrails.com/widget/trail/south-africa/western-cape/platteklip-gorge-to-upper-cable-station?u=m&sh=wv1ywk"
              width="100%"
              frameBorder="0"
              scrolling="no"
              title="AllTrails Guide"
            ></iframe>
          </div>
        </GlassCard>

        {/* Packing List (Span 5) */}
        <GlassCard className="p-8 lg:col-span-5 h-full" delay={0.1}>
          <div className="flex items-center gap-4 mb-6 text-rose-400">
            <Backpack className="w-8 h-8" />
            <h3 className="text-2xl font-bold uppercase tracking-wider text-white">Gear Check</h3>
          </div>
          <PackingList />
        </GlassCard>

        {/* --- ROW 3: Weather & Cable Car (Medium Items) --- */}

        {/* Weather Widget (Span 7) */}
        <GlassCard className="p-6 md:p-8 lg:col-span-7 h-full" delay={0.05}>
          <div className="flex items-center gap-4 mb-4 text-sky-400">
            <Cloud className="w-8 h-8" />
            <h3 className="text-2xl font-bold uppercase tracking-wider text-white">Average Conditions</h3>
          </div>
          <WeatherWidget />
        </GlassCard>

        {/* Cable Car Pricing (Span 5) */}
        <GlassCard className="p-8 lg:col-span-5 h-full" delay={0.25}>
          <div className="flex items-center gap-4 mb-6 text-purple-400">
            <Ticket className="w-8 h-8" />
            <h3 className="text-2xl font-bold uppercase tracking-wider text-white">Cable Car Down</h3>
          </div>
          <ul className="space-y-4">
            {CABLE_CAR_PRICES.map((item, idx) => (
              <li key={idx} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0">
                <div>
                  <p className="text-slate-200 font-medium">{item.category}</p>
                  {item.details && <p className="text-xs text-slate-500">{item.details}</p>}
                </div>
                <span className="text-xl font-bold text-white">R{item.price}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-center text-slate-500 mt-6 italic">*Weather dependent operation</p>
        </GlassCard>

        {/* --- ROW 4: Food & Effort (Variable Height) --- */}

        {/* Food Specials (Span 7) - Widened for better fit */}
        <GlassCard className="p-8 bg-gradient-to-br from-orange-900/20 to-slate-900/50 lg:col-span-7 h-full" delay={0.3}>
          <div className="flex items-center gap-4 mb-6 text-yellow-400">
            <Coffee className="w-8 h-8" />
            <h3 className="text-2xl font-bold uppercase tracking-wider text-white">Ten67 Eatery</h3>
          </div>
          <p className="text-sm text-slate-400 mb-6">Exclusive Pensioner Specials at the Summit</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MENU_SPECIALS.map((special, idx) => (
              <div key={idx} className="relative overflow-hidden rounded-xl bg-black/20 p-5 border border-white/10 group hover:border-orange-500/30 transition-colors interactive">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-cinzel font-bold text-lg text-orange-100">{special.name}</h4>
                  <span className="bg-orange-600 text-white px-2 py-1 rounded text-sm font-bold">R{special.price}</span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {special.items.map((item, i) => (
                    <span key={i} className="text-xs bg-white/5 px-2 py-1 rounded text-slate-300 border border-white/5">
                      {item}
                    </span>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Effort (Span 5) */}
        <GlassCard className="p-8 lg:col-span-5 h-full" delay={0.2}>
          <div className="flex items-center gap-4 mb-6 text-emerald-400">
            <TrendingUp className="w-8 h-8" />
            <h3 className="text-2xl font-bold uppercase tracking-wider text-white">How long it will take</h3>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-white/5 p-5 rounded-lg border border-white/5 flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Fast Group</p>
                <p className="text-xs text-slate-500 mt-1">High Intensity</p>
              </div>
              <p className="text-3xl font-black text-white">~1.5h</p>
            </div>
            <div className="bg-white/5 p-5 rounded-lg border border-white/5 flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Slow Group</p>
                <p className="text-xs text-slate-500 mt-1">Moderate Pace</p>
              </div>
              <p className="text-3xl font-black text-white">~4h</p>
            </div>
          </div>
        </GlassCard>

      </div>
    </section>
  );
};