import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, RefreshCw } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import { getPortfolio } from '../dbService';

export default function PortfolioPreview({ onOrderSimilar, setActiveTab, setSelectedProject }: any) {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      const data = await getPortfolio();
      // عرض أول 3 أعمال فقط
      setProjects(data.slice(0, 3));
      setIsLoading(false);
    };
    loadProjects();
  }, []);

  return (
    <section className="bg-[#050505] text-white py-14 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6">
          <div className="space-y-3 md:space-y-4">
            <span className="text-amber-500 font-bold tracking-[0.25em] text-[9px] md:text-[10px] uppercase">#معرض_الإنتاج_والإبداع</span>
            <h2 className="leading-tight text-2xl sm:text-3xl md:text-4xl font-black">مجد أعمالنا: تجسيد الأفكار <br className="hidden sm:inline"/> إلى واقع فني مبهر</h2>
          </div>
          <button 
            onClick={() => setActiveTab && setActiveTab('portfolio')}
            className="w-full md:w-auto bg-white/5 border border-white/10 px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold text-xs md:text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            عرض كل الأعمال الفنية <ArrowLeft size={16} />
          </button>
        </div>
        
        {isLoading ? (
            <div className="flex justify-center py-20 text-white/30"><RefreshCw className="animate-spin" size={24} /></div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {projects.map((project) => (
                <div key={project.id} className="group bg-zinc-900/40 rounded-3xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all flex flex-col">
                  <div className="h-48 sm:h-56 bg-zinc-800 relative overflow-hidden">
                    {/* منطق عرض الفيديو أو الصورة */}
                    {project.mediaType === 'video' && project.mediaUrl ? (
                      <VideoPlayer url={project.mediaUrl} autoplay={false} className="w-full h-full object-cover" />
                    ) : project.mediaUrl ? (
                      <img 
                        src={project.mediaUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xs">لا يوجد معاينة</div>
                    )}
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <span className="text-amber-500 text-[10px] font-bold uppercase tracking-widest">{project.category}</span>
                    <h3 className="text-base md:text-lg font-bold mt-2 md:mt-3 mb-2 md:mb-4">{project.title}</h3>
                    <p className="text-white/60 text-xs md:text-sm mb-6 md:mb-8 line-clamp-2 leading-relaxed">{project.description}</p>
                    
                    {/* زر عرض التفاصيل الجديد الموجه لـ App.tsx */}
                    <div className="mt-auto">
                      <button 
                        onClick={() => setSelectedProject && setSelectedProject(project)} 
                        className="text-xs font-bold text-white flex items-center gap-2 hover:text-amber-500 transition-colors"
                      >
                        <ExternalLink size={14} /> عرض التفاصيل
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        )}
      </div>
    </section>
  );
}