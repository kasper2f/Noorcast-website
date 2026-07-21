import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VideoPlayer from './VideoPlayer'; 
import Loader from './Loader';
import { getPortfolio } from '../dbService'; 

interface PortfolioProps {
  isAdmin: boolean;
  onOrderSimilar: (item: any) => void;
  setSelectedProject: (project: any) => void; 
  filterCategory?: string; 
}

export default function Portfolio({ isAdmin, onOrderSimilar, setSelectedProject, filterCategory }: PortfolioProps) {
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(filterCategory || 'الكل');

  useEffect(() => {
    const loadPortfolio = async () => {
      setIsLoading(true);
      const data = await getPortfolio();
      setPortfolioItems(data);
      setIsLoading(false);
    };
    loadPortfolio();
  }, []);

  const categories = ['الكل', ...Array.from(new Set(portfolioItems.map(item => item.category || 'أخرى')))];

  const displayedPortfolio = selectedCategory === 'الكل' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const handleOrderSimilar = (item: any) => {
    const dataToSend = {
      ...item,
      sourceProject: {
        title: item.title,
        freelancerName: item.freelancerName,
        imageUrl: item.mediaUrl ? item.mediaUrl.split(',')[0].trim() : "" 
      }
    };
    onOrderSimilar(dataToSend);
  };

  if (isLoading) {
    return <Loader text="جاري تحميل معرض الأعمال الإبداعي..." />;
  }

  return (
    <div className="px-4 py-6 md:p-10 text-white max-w-[1400px] mx-auto">
      {/* رأس الصفحة وعنوانها المتناسق */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-12 gap-4">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-black tracking-tight leading-snug">
          {selectedCategory !== 'الكل' ? `أعمال: ${selectedCategory}` : 'أعمالنا'}
        </h1>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 max-w-full scrollbar-none w-full md:w-auto">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm font-bold border transition-all whitespace-nowrap ${
                selectedCategory === cat 
                  ? 'bg-amber-500 text-black border-amber-500 shadow-md' 
                  : 'bg-[#121212] text-white border-white/5 hover:border-amber-500/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {displayedPortfolio.length === 0 ? (
        <p className="text-white/40 italic text-center py-20 text-xs md:text-sm">لا توجد أعمال تطابق هذا التصنيف...</p>
      ) : (
        /* العرض الآن عمود واحد مرتب تماماً على الجوال (grid-cols-1) و 3 أعمدة على اللابتوب (md:grid-cols-3) */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          {displayedPortfolio.map((item) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#121212] border border-white/5 p-4 md:p-6 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.05)] hover:border-amber-500/30 transition-all duration-500 group flex flex-col justify-between"
            >
              <div>
                {/* حاوية الميديا والفيديو بمقاس مرن ونظيف جداً */}
                <div className="mb-4 h-48 sm:h-56 relative overflow-hidden rounded-xl border border-white/10 bg-black">
                  {item.mediaType === 'image' && item.mediaUrl ? (
                    <img 
                      src={item.mediaUrl.split(',')[0].trim()} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : item.mediaType === 'video' && item.mediaUrl ? (
                    <VideoPlayer 
                      url={item.mediaUrl} 
                      autoplay={false} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 text-[10px] uppercase tracking-widest">
                      لا توجد معاينة
                    </div>
                  )}
                </div>

                {/* عناوين مرتبطة وبأحجام منضبطة تماماً */}
                <h2 className="text-base md:text-xl font-bold text-white group-hover:text-amber-500 transition-colors leading-snug">{item.title}</h2>
                <p className="text-[10px] md:text-xs text-amber-500/80 font-bold mt-1 uppercase tracking-wider">{item.category}</p>
                <p className="text-xs text-white/50 mt-2.5 line-clamp-2 leading-relaxed">{item.description}</p>
              </div>
              
              <div className="flex flex-col gap-3 mt-5 pt-4 border-t border-white/5">
                <button 
                  onClick={() => setSelectedProject(item)} 
                  className="w-full bg-white/5 py-2.5 rounded-xl text-xs md:text-sm font-bold hover:bg-amber-500 hover:text-black transition-all"
                >
                  عرض التفاصيل
                </button>
                
                <div className="flex justify-center">
                  <button 
                    onClick={() => handleOrderSimilar(item)} 
                    className="text-amber-500 text-xs md:text-sm font-bold hover:text-amber-400 transition-all underline decoration-amber-500/30 underline-offset-4"
                  >
                    طلب مشابه
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}