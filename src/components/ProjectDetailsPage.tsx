import React from 'react';
import { ArrowLeft } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

interface ProjectDetailsProps {
  project: any;
  onBack: () => void;
  onOrderSimilar: (project: any) => void;
}

export default function ProjectDetailsPage({ project, onBack, onOrderSimilar }: ProjectDetailsProps) {
  if (!project) return <div className="text-white p-20">عذراً، العمل غير موجود.</div>;

  return (
    <div className="bg-[#050505] min-h-screen text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-white/50 hover:text-white mb-10 transition-colors"
        >
          <ArrowLeft size={20} /> عودة للمعرض
        </button>

        {/* العنوان والبيانات الأساسية */}
        <h1 className="text-5xl font-black mb-6">{project.title}</h1>
        <div className="flex gap-4 mb-12 text-sm text-amber-500 font-bold uppercase tracking-widest">
          <span>{project.category}</span>
          <span>•</span>
          <span>{project.clientName}</span>
        </div>

        {/* عرض الوسائط */}
        <div className="columns-1 md:columns-2 gap-6 mb-16 space-y-6">
          {project.projectAssets?.map((asset: any, index: number) => (
            <div 
              key={index} 
              className="break-inside-avoid rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 group"
            >
              {asset.type === 'image' ? (
                <img 
                  src={asset.url} 
                  alt={`${project.title} - Asset ${index + 1}`} 
                  className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105" 
                />
              ) : (
                <div className="w-full aspect-video">
                  <VideoPlayer 
                    url={asset.url} 
                    autoplay={false} 
                    className="w-full h-full" 
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* دراسة الحالة والمقالة */}
        <div className="prose prose-invert max-w-none mb-16">
          <h3 className="text-2xl font-bold text-amber-500 mb-4">قصة العمل (Case Study)</h3>
          <p className="text-lg text-white/80 leading-relaxed whitespace-pre-line">{project.caseStudy}</p>
        </div>

        {/* زر الطلب */}
        <button 
          onClick={() => onOrderSimilar(project)}
          className="w-full bg-amber-500 text-black py-6 rounded-2xl font-black text-lg hover:bg-white transition-all"
        >
          اطلب عمل مشابه لهذا المشروع
        </button>
      </div>
    </div>
  );
}