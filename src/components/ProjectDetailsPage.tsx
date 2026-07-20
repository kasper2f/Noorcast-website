import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

interface ProjectDetailsProps {
  project: any;
  onBack: () => void;
  onOrderSimilar: (project: any) => void;
  onServiceClick?: (serviceName: string) => void; // التوجيه المباشر للخدمة في المتجر
}

export default function ProjectDetailsPage({ project, onBack, onOrderSimilar, onServiceClick }: ProjectDetailsProps) {
  if (!project) return <div className="text-white p-20">عذراً، العمل غير موجود.</div>;

  // استخراج الخدمات من العمود الجديد (services) في الشيت (سواء نص مفصول بفواصل أو مصفوفة)
  const servicesList = Array.isArray(project.services) 
    ? project.services 
    : typeof project.services === 'string' && project.services.trim() !== ''
      ? project.services.split(',').map((s: string) => s.trim())
      : typeof project.subCategory === 'string' && project.subCategory.trim() !== ''
        ? [project.subCategory]
        : ['إنتاج فيديو دعائي', 'Motion Graphics', 'AI Video', 'Drone'];

  // دالة مطابقة ذكية لتوحيد اسم الخدمة الموجه للأسماء الدقيقة في المتجر
  const getExactStoreServiceName = (service: string) => {
    const cleanService = service.trim().toLowerCase();
    if (cleanService.includes('drone') || cleanService.includes('درون') || cleanService.includes('جوي')) {
      return 'تصوير جوي بالدرون'; // الاسم الدقيق للخدمة في المتجر
    }
    return service.trim();
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors text-xs md:text-sm font-bold"
        >
          <ArrowLeft size={18} /> عودة للمعرض
        </button>

        {/* 1. اسم المشروع، اسم العميل فقط، والتصنيف */}
        <div className="mb-8 border-b border-white/10 pb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 text-white">{project.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-bold">
            <span className="text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">{project.category || 'تصنيف عام'}</span>
            <span className="text-white/30">•</span>
            <span className="text-white/80">العميل: <strong className="text-white">{project.clientName || project.freelancerName || 'غير مسجل'}</strong></span>
          </div>
        </div>

        {/* 2. الفيديو أو الوسائط الرئيسية (عرض الصور مكتملة وغير مقطوعة) */}
        <div className="mb-10 rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_0_30px_rgba(245,158,11,0.05)] flex items-center justify-center">
          {project.projectAssets && project.projectAssets.length > 0 ? (
            <div className="w-full aspect-video flex items-center justify-center bg-black/60">
              {project.projectAssets[0].type === 'image' ? (
                <img 
                  src={project.projectAssets[0].url} 
                  alt={project.title} 
                  className="w-full h-full object-contain" 
                />
              ) : (
                <VideoPlayer 
                  url={project.projectAssets[0].url} 
                  autoplay={false} 
                  className="w-full h-full" 
                />
              )}
            </div>
          ) : project.mediaUrl ? (
            <div className="w-full aspect-video flex items-center justify-center bg-black/60">
              {project.mediaType === 'image' ? (
                <img src={project.mediaUrl.split(',')[0].trim()} alt={project.title} className="w-full h-full object-contain" />
              ) : (
                <VideoPlayer url={project.mediaUrl} autoplay={false} className="w-full h-full" />
              )}
            </div>
          ) : (
            <div className="w-full h-64 flex items-center justify-center text-white/30 text-xs">لا توجد وسائط متاحة</div>
          )}
        </div>

        {/* 3. نبذة عن المشروع (عرض النص بالكامل دون اقتطاع) */}
        <div className="bg-[#121212] p-6 md:p-8 rounded-3xl border border-white/5 mb-8">
          <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3">نبذة عن المشروع</h3>
          <p className="text-sm md:text-base text-white/80 leading-relaxed whitespace-pre-line">
            {project.caseStudy || project.description || "لا يوجد وصف مختصر متوفر لهذا المشروع حالياً..."}
          </p>
        </div>

        {/* 4. الخدمات المستخدمة (مرتبطة بقراءتها من الشيت وتوجه للخدمة الخاصة بالاسم الدقيق عند النقر) */}
        <div className="bg-[#121212] p-6 md:p-8 rounded-3xl border border-white/5 mb-10">
          <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-4">الخدمات المستخدمة في العمل</h3>
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
                  className="flex items-center gap-2 bg-black/60 hover:bg-amber-500 hover:text-black text-white/90 border border-white/10 hover:border-amber-500 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer shadow-sm group"
                >
                  <CheckCircle2 size={15} className="text-amber-500 group-hover:text-black transition-colors" />
                  <span>{service}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. النتيجة النهائية (الصور الإضافية مكتملة وغير مقطوعة) */}
        {project.projectAssets && project.projectAssets.length > 1 && (
          <div className="mb-12">
            <h3 className="text-lg font-bold text-white mb-4">النتيجة النهائية والمعاينة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.projectAssets.slice(1).map((asset: any, index: number) => (
                <div key={index} className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 aspect-video flex items-center justify-center bg-black/60">
                  {asset.type === 'image' ? (
                    <img src={asset.url} alt="Result Asset" className="w-full h-full object-contain" />
                  ) : (
                    <VideoPlayer url={asset.url} autoplay={false} className="w-full h-full" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. زر النهاية: نفذ مشروعاً مشابهاً */}
        <div className="pt-4">
          <button 
            onClick={() => onOrderSimilar(project)}
            className="w-full bg-amber-500 text-black py-4 md:py-5 rounded-2xl font-black text-sm md:text-base hover:bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all flex items-center justify-center gap-2"
          >
            <span>نفذ مشروعاً مشابهاً</span>
            <span>←</span>
          </button>
        </div>
      </div>
    </div>
  );
}