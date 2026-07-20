import React from 'react';

interface WorkCardProps {
  title: string;
  category: string;
  imageUrl: string;
}

export default function WorkCard({ title, category, imageUrl }: WorkCardProps) {
  return (
    <div className="group bg-[#121212] rounded-3xl overflow-hidden border border-white/5 hover:border-amber-500/50 transition-all duration-500 shadow-[0_0_20px_rgba(245,158,11,0.05)] hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
        />
        {/* تأثير إضاءة خفيف فوق الصورة */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-60"></div>
      </div>
      <div className="p-6">
        <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest">{category}</span>
        <h3 className="text-lg font-bold text-white mt-1 group-hover:text-amber-500 transition-colors duration-300">{title}</h3>
      </div>
    </div>
  );
}