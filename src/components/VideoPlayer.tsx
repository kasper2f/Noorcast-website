import React from 'react';

export default function VideoPlayer({ url, autoplay = false, className = "" }: any) {
  // 1. تنظيف وتفكيك الروابط (نقسم عند الفاصلة ونزيل المسافات الزائدة)
  const videoUrls = url ? url.split(',').map((u: string) => u.trim()).filter((u: string) => u !== "") : [];

  // 2. دالة لاستخراج المعرف وتحويل الرابط لصيغة Embed عالمية
  const getEmbedUrl = (link: string) => {
    let videoId = "";
    
    // استخراج المعرف من روابط Shorts
    if (link.includes('shorts/')) {
      videoId = link.split('shorts/')[1].split('?')[0];
    } 
    // استخراج المعرف من الروابط الأخرى (embed, watch, youtu.be)
    else {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = link.match(regExp);
      videoId = (match && match[2].length === 11) ? match[2] : "";
    }

    if (!videoId) return null;
    
    // إرجاع الرابط بصيغة embed/ الموحدة
    return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=1&loop=1&playlist=${videoId}&modestbranding=1&rel=0&controls=1`;
  };

  return (
    <div className={`w-full h-full flex flex-wrap gap-4 ${className}`}>
      {videoUrls.length > 0 ? (
        videoUrls.map((link: string, index: number) => {
          const embedUrl = getEmbedUrl(link);
          
          if (!embedUrl) return null;

          return (
            <div key={index} className="relative aspect-video flex-1 min-w-[280px] overflow-hidden bg-black rounded-xl border border-white/10 shadow-lg">
              <iframe
                src={embedUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              {/* طبقة الحماية لمنع النقر إذا كان الفيديو تلقائياً */}
              {autoplay && <div className="absolute inset-0 z-10 cursor-default"></div>}
            </div>
          );
        })
      ) : (
        <div className="flex items-center justify-center w-full h-full text-white/20 text-xs uppercase tracking-widest">
          لا توجد معاينة متاحة
        </div>
      )}
    </div>
  );
}