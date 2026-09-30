import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoPlayer from './VideoPlayer';

interface ProjectDetailsProps {
  project: any;
  onBack: () => void;
  onOrderSimilar: (project: any) => void;
  onServiceClick?: (serviceName: string) => void;
}

export default function ProjectDetailsPage({ project, onBack, onOrderSimilar, onServiceClick }: ProjectDetailsProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!project) return <div className="text-white p-20">عذراً، العمل غير موجود.</div>;

  const servicesList = Array.isArray(project.services) 
    ? project.services 
    : typeof project.services === 'string' && project.services.trim() !== ''
      ? project.services.split(',').map((s: string) => s.trim())
      : typeof project.subCategory === 'string' && project.subCategory.trim() !== ''
        ? [project.subCategory]
        : ['إنتاج فيديو دعائي', 'Motion Graphics', 'AI Video', 'Drone'];

  const getExactStoreServiceName = (service: string) => {
    const cleanService = service.trim().toLowerCase();
    if (cleanService.includes('drone') || cleanService.includes('درون') || cleanService.includes('جوي')) {
      return 'تصوير جوي بالدرون'; 
    }
    return service.trim();
  };

  const extraMediaUrls = (!project.projectAssets || project.projectAssets.length === 0) && project.mediaUrl && project.mediaUrl.includes(',')
    ? project.mediaUrl.split(',').slice(1).map((u: string) => u.trim())
    : [];

  // 💡 الحل هنا: أضفنا "as const" لكي يفهم TypeScript أنها قيمة ثابتة مقبولة
  const springTransition = { type: "spring" as const, damping: 25, stiffness: 300 };

  return (
    <>
      <div className="bg-[#050505] min-h-screen text-white py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors text-xs md:text-sm font-bold"
          >
            <ArrowLeft size={18} /> عودة للمعرض
          </button>

          {/* 1. اسم المشروع */}
          <div className="mb-8 border-b border-white/10 pb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 text-white">{project.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-bold">
              <span className="text-[#e18d33] bg-[#e18d33]/10 px-3 py-1 rounded-full border border-[#e18d33]/20">{project.category || 'تصنيف عام'}</span>
              <span className="text-white/30">•</span>
              <span className="text-white/80">العميل: <strong className="text-white">{project.clientName || project.freelancerName || 'غير مسجل'}</strong></span>
            </div>
          </div>

          {/* 2. الصورة الرئيسية / الغلاف */}
          <div className="mb-10 rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_0_30px_rgba(225,141,51,0.05)] flex items-center justify-center">
            {project.projectAssets && project.projectAssets.length > 0 ? (
              <div className="w-full bg-black/60">
                {project.projectAssets[0].type === 'image' ? (
                  <motion.img 
                    layoutId={project.projectAssets[0].url} 
                    transition={springTransition}
                    src={project.projectAssets[0].url} 
                    alt={project.title} 
                    onClick={() => setSelectedImage(project.projectAssets[0].url)}
                    className="w-full h-auto max-h-[70vh] object-contain mx-auto cursor-pointer hover:opacity-90 transition-opacity" 
                  />
                ) : (
                  <div className="w-full aspect-video">
                    <VideoPlayer url={project.projectAssets[0].url} autoplay={false} className="w-full h-full" />
                  </div>
                )}
              </div>
            ) : project.mediaUrl ? (
              <div className="w-full bg-black/60">
                {project.mediaType === 'image' ? (
                  <motion.img 
                    layoutId={project.mediaUrl.split(',')[0].trim()} 
                    transition={springTransition}
                    src={project.mediaUrl.split(',')[0].trim()} 
                    alt={project.title} 
                    onClick={() => setSelectedImage(project.mediaUrl.split(',')[0].trim())}
                    className="w-full h-auto max-h-[70vh] object-contain mx-auto cursor-pointer hover:opacity-90 transition-opacity" 
                  />
                ) : (
                  <div className="w-full aspect-video">
                    <VideoPlayer url={project.mediaUrl.split(',')[0].trim()} autoplay={false} className="w-full h-full" />
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-64 flex items-center justify-center text-white/30 text-xs">لا توجد وسائط متاحة</div>
            )}
          </div>

          {/* 3. نبذة عن المشروع */}
          <div className="bg-[#121212] p-6 md:p-8 rounded-3xl border border-white/5 mb-8">
            <h3 className="text-xs font-bold text-[#e18d33] uppercase tracking-widest mb-3">نبذة عن المشروع</h3>
            <p className="text-sm md:text-base text-white/80 leading-relaxed whitespace-pre-line">
              {project.caseStudy || project.description || "لا يوجد وصف مختصر متوفر لهذا المشروع حالياً..."}
            </p>
          </div>

          {/* 4. الخدمات المستخدمة */}
          <div className="bg-[#121212] p-6 md:p-8 rounded-3xl border border-white/5 mb-10">
            <h3 className="text-xs font-bold text-[#e18d33] uppercase tracking-widest mb-4">الخدمات المستخدمة في العمل</h3>
            <div className="flex flex-wrap gap-2.5">
              {servicesList.map((service: string, index: number) => {
                const exactStoreService = getExactStoreServiceName(service);
                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (onServiceClick) {
                        onServiceClick(exactStoreService);
                      } else {
                        onOrderSimilar({ ...project, selectedService: exactStoreService });
                      }
                    }}
                    className="flex items-center gap-2 bg-black/60 hover:bg-[#e18d33] hover:text-black text-white/90 border border-white/10 hover:border-[#e18d33] px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer shadow-sm group"
                  >
                    <CheckCircle2 size={15} className="text-[#e18d33] group-hover:text-black transition-colors" />
                    <span>{service}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. النتيجة النهائية والمعاينة */}
          {((project.projectAssets && project.projectAssets.length > 1) || extraMediaUrls.length > 0) && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-white mb-4">النتيجة النهائية والمعاينة</h3>
              
              <div className="columns-1 sm:columns-2 gap-4 space-y-4">
                
                {project.projectAssets && project.projectAssets.length > 1 && project.projectAssets.slice(1).map((asset: any, index: number) => (
                  <div key={`asset-${index}`} className="break-inside-avoid rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 bg-black/60">
                    {asset.type === 'image' ? (
                      <motion.img 
                        layoutId={asset.url}
                        transition={springTransition}
                        src={asset.url} 
                        alt="Result Asset" 
                        onClick={() => setSelectedImage(asset.url)}
                        className="w-full h-auto object-cover cursor-pointer hover:opacity-80 transition-opacity" 
                      />
                    ) : (
                      <div className="w-full aspect-video">
                        <VideoPlayer url={asset.url} autoplay={false} className="w-full h-full" />
                      </div>
                    )}
                  </div>
                ))}

                {extraMediaUrls.length > 0 && extraMediaUrls.map((url: string, index: number) => (
                  <div key={`extra-${index}`} className="break-inside-avoid rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 bg-black/60">
                    {project.mediaType === 'video' && (url.includes('.mp4') || url.includes('youtube') || url.includes('vimeo')) ? (
                      <div className="w-full aspect-video">
                        <VideoPlayer url={url} autoplay={false} className="w-full h-full" />
                      </div>
                    ) : (
                      <motion.img 
                        layoutId={url}
                        transition={springTransition}
                        src={url} 
                        alt="Result Asset" 
                        onClick={() => setSelectedImage(url)}
                        className="w-full h-auto object-cover cursor-pointer hover:opacity-80 transition-opacity" 
                      />
                    )}
                  </div>
                ))}

              </div>
            </div>
          )}

          {/* 6. زر النهاية */}
          <div className="pt-4">
            <button 
              onClick={() => onOrderSimilar(project)}
              className="w-full bg-[#e18d33] text-black py-4 md:py-5 rounded-2xl font-black text-sm md:text-base hover:opacity-90 shadow-[0_0_20px_rgba(225,141,51,0.3)] transition-all flex items-center justify-center gap-2"
            >
              <span>نفذ مشروعاً مشابهاً</span>
              <span>←</span>
            </button>
          </div>
        </div>
      </div>

      {/* شاشة العرض المكبرة المُحسّنة */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedImage(null)}
            />
            
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 bg-white/10 rounded-full z-[101]"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </motion.button>

            <motion.img
              layoutId={selectedImage}
              transition={springTransition}
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl relative z-[100]"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}