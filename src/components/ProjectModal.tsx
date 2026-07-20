import React from 'react';
import { X } from 'lucide-react';

export default function ProjectModal({ project, onClose, onOrderSimilar }: any) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-900 border border-white/10 w-full max-w-lg rounded-3xl p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 left-6 text-white/50 hover:text-white">
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-black mb-6">{project.title}</h2>
        
        <div className="space-y-6 text-sm text-white/70">
          <div>
            <h4 className="text-amber-500 font-bold mb-2">نظرة عامة عن المشروع:</h4>
            <p className="leading-relaxed">
              {project.fullDescription || project.description}
            </p>
          </div>
          
          <div className="pt-4 border-t border-white/5 text-xs text-white/40">
            تاريخ العمل: {project.createdAt}
          </div>
        </div>

        <button 
          onClick={() => { onOrderSimilar(project.category); onClose(); }}
          className="w-full mt-8 bg-amber-500 text-black py-4 rounded-xl font-black hover:bg-white transition-all"
        >
          اطلب عمل مشابه الآن
        </button>
        
        <button onClick={onClose} className="w-full mt-3 text-white/40 text-xs hover:text-white transition-colors">
          إغلاق النافذة
        </button>
      </div>
    </div>
  );
}