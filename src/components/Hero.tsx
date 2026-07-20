import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VideoPlayer from './VideoPlayer'; 
import { heroVideos } from '../Data/data'; 
import * as LucideIcons from 'lucide-react'; 

export default function Hero({ setActiveTab }: any) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % heroVideos.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#0A0A0B] py-10 md:py-16 px-4 md:px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        
        {/* البطاقة النصية */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#121212] p-6 sm:p-8 md:p-10 rounded-3xl border border-white/5 shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:border-amber-500/30 transition-all duration-500 flex flex-col justify-between min-h-[400px] md:min-h-[450px]"
        >
          <div>
            <span className="text-amber-500 font-bold tracking-[0.2em] text-[9px] md:text-[10px] uppercase mb-3 md:mb-4 block">#نصنع_المستقبل_البصري</span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight mb-4 md:mb-6 text-white">
              نحول أفكارك إلى <br /> <span className="text-amber-500">واقع بصري مذهل</span>
            </h1>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-sm mb-6 md:mb-8">
               نوركاست تجمع بين الإنتاج السينمائي الاحترافي، والتخطيط التسويقي الذكي، لرفع جودة محتواك ومضاعفة أرقامك.
            </p>
            
            <div className="grid grid-cols-2 gap-2.5 md:gap-3 mb-6 md:mb-8">
              {[
                { name: 'إنتاج سينمائي', icon: 'Video' },
                { name: 'تخطيط تسويقي', icon: 'Target' },
                { name: 'موشن جرافيك', icon: 'Monitor' },
                { name: 'إدارة محتوى', icon: 'Share2' }
              ].map((item, i) => {
                const Icon = (LucideIcons as any)[item.icon]; 
                return (
                  <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-white/70 bg-black/50 p-2 md:p-2.5 rounded-lg border border-white/5 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all duration-300">
                    <span className="text-amber-500 shrink-0">{Icon && <Icon size={16} />}</span> 
                    <span className="truncate">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-4 border-t border-white/5">
            <button onClick={() => setActiveTab('store')} className="bg-amber-500 text-black px-5 py-2.5 rounded-xl font-black text-xs md:text-sm hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)]">زور المتجر مباشرة</button>
            <button onClick={() => setActiveTab('portfolio')} className="text-white text-xs md:text-sm font-bold hover:text-amber-500 transition-colors">معرض الأعمال ←</button>
          </div>
        </motion.div>

        {/* بطاقة الفيديو */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#121212] p-6 md:p-8 rounded-3xl border border-white/5 shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:border-amber-500/30 transition-all duration-500 min-h-[380px] md:min-h-[450px] flex flex-col justify-between"
        >
          <div className="mb-4 md:mb-6 flex-grow relative overflow-hidden rounded-2xl transition-opacity duration-500 aspect-video md:aspect-auto">
            <motion.div
              key={currentVideoIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <VideoPlayer 
                url={heroVideos[currentVideoIndex]} 
                autoplay={true} 
                className="rounded-2xl border border-white/10 hover:border-amber-500/50 transition-all w-full h-full" 
              />
            </motion.div>
          </div>
          
          <div className="flex justify-center items-center py-1 md:py-2">
            <div className="text-amber-500 text-[12px] md:text-[15px] font-black uppercase tracking-[0.3em] opacity-100 border-t border-white/5 pt-6 md:pt-10 w-full text-center">
              أحدث أعمالنا
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}