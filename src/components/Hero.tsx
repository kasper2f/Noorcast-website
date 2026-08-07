import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import VideoPlayer from './VideoPlayer'; 
import { heroVideos } from '../Data/data'; 

// مكون فرعي للأرقام التصاعدية المتحركة
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest) + suffix);

  useEffect(() => {
    const controls = animate(count, value, { duration: 2.5, ease: 'easeOut' });
    return controls.stop;
  }, [count, value]);

  return <motion.span>{rounded}</motion.span>;
}

export default function Hero({ setActiveTab, setSelectedCategory }: any) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % heroVideos.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // دالة الانتقال المباشر لتبويب "خدماتنا" في المتجر
  const handleStoreServicesClick = () => {
    setActiveTab('store-services');
  };

  return (
    <section className="bg-[#0A0A0B] py-10 md:py-16 px-4 md:px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        
        {/* البطاقة النصية (اليمين) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#121212] p-6 sm:p-8 md:p-10 rounded-3xl border border-white/5 shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:border-amber-500/30 transition-all duration-500 flex flex-col justify-between min-h-[400px] md:min-h-[450px]"
        >
          <div>
            <span className="text-amber-500 font-bold tracking-[0.2em] text-[9px] md:text-[10px] uppercase mb-3 md:mb-4 block">#نصنع_المستقبل_البصري</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-3 text-white">
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 leading-snug">
              <span className="text-white">من الفكرة إلى التنفيذ...</span> <span className="text-amber-500">اطلب خدماتك الإبداعية بسهولة ووضوح</span>
            </h2>
            <p className="text-white/40 text-xs sm:text-sm leading-relaxed mb-6 md:mb-8 font-medium">
              لماذا يثقون العملاء في نوركاست
            </p>
            
            {/* المربعات الأربعة الجديدة المنظمة */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 md:mb-8">
              {[
                { title: '🟡 أسعار معلنة', desc: 'اعرف تكلفة مشروعك قبل إرسال الطلب.' },
                { title: '🟡 خصص خدمتك', desc: 'اختر الإضافات التي تناسب احتياجك فقط.' },
                { title: '🟡 تنفيذ بإحترافية', desc: 'جودة في التنفيذ، والتزام بالمواعيد، وتجربة عمل واضحة.' },
                { title: '🟡 شاهد الأعمال أولاً', desc: 'شاهد الجودة قبل اتخاذ قرار الشراء.' }
              ].map((box, i) => (
                <div key={i} className="bg-black/40 p-3.5 rounded-2xl border border-white/5 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-center">
                  <span className="text-xs sm:text-sm font-bold text-white mb-1 block">{box.title}</span>
                  <span className="text-[11px] sm:text-xs text-white/60 leading-relaxed">{box.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-4 border-t border-white/5">
            {/* الزر المعدل لينتقل لتبويب خدماتنا في المتجر مباشرة */}
            <button 
              onClick={handleStoreServicesClick} 
              className="bg-amber-500 text-black px-5 py-2.5 rounded-xl font-black text-xs md:text-sm hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)]"
            >
              زور المتجر مباشرة
            </button>
            <button onClick={() => setActiveTab('portfolio')} className="text-white text-xs md:text-sm font-bold hover:text-amber-500 transition-colors">معرض الأعمال ←</button>
          </div>
        </motion.div>

        {/* بطاقة الفيديو (اليسار) */}
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
          
          {/* قسم الإحصائيات التفاعلية المتحركة تحت الفيديو */}
          <div className="grid grid-cols-4 gap-2 pt-4 border-t border-white/5 text-center">
            <div className="bg-black/40 p-2 rounded-xl border border-white/5">
              <div className="text-amber-500 font-black text-sm md:text-base">
                +<AnimatedCounter value={200} />
              </div>
              <div className="text-white/40 text-[9px] md:text-[10px] mt-0.5">مشروع</div>
            </div>
            <div className="bg-black/40 p-2 rounded-xl border border-white/5">
              <div className="text-amber-500 font-black text-sm md:text-base">
                +<AnimatedCounter value={50} />
              </div>
              <div className="text-white/40 text-[9px] md:text-[10px] mt-0.5">عميل</div>
            </div>
            <div className="bg-black/40 p-2 rounded-xl border border-white/5">
              <div className="text-amber-500 font-black text-sm md:text-base">
                +<AnimatedCounter value={10} />
              </div>
              <div className="text-white/40 text-[9px] md:text-[10px] mt-0.5">سنوات خبرة</div>
            </div>
            <div className="bg-black/40 p-2 rounded-xl border border-white/5">
              <div className="text-amber-500 font-black text-sm md:text-base">
                <AnimatedCounter value={98} suffix="%" />
              </div>
              <div className="text-white/40 text-[9px] md:text-[10px] mt-0.5">رضا العملاء</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}