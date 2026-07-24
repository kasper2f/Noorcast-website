import React, { useState } from 'react';

export default function VideoPlayer({ url, autoplay = false, className = "" }: any) {
  const [modalVideoUrl, setModalVideoUrl] = useState<string | null>(null);

  // 1. تنظيف وتفكيك الروابط (نقسم عند الفاصلة ونزيل المسافات الزائدة)
  const videoUrls = url ? url.split(',').map((u: string) => u.trim()).filter((u: string) => u !== "") : [];

  // 2. دالة لاستخراج المعرف وتحويل الرابط لصيغة Embed عالمية
  const getEmbedUrl = (link: string, isModal = false) => {
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
    
    // في وضع النافذة الكبيرة (Modal) نجعل التشغيل تلقائياً والصوت مفعلاً لراحة المستخدم
    const shouldAutoplay = isModal ? 1 : (autoplay ? 1 : 0);
    const muteSetting = isModal ? 0 : 1;

    return `https://www.youtube.com/embed/${videoId}?autoplay=${shouldAutoplay}&mute=${muteSetting}&loop=1&playlist=${videoId}&modestbranding=1&rel=0&controls=1&disablekb=1&iv_load_policy=3`;
  };

  return (
    <>
      <div className={`w-full h-full flex flex-wrap gap-4 ${className}`}>
        {videoUrls.length > 0 ? (
          videoUrls.map((link: string, index: number) => {
            const embedUrl = getEmbedUrl(link, false);
            
            if (!embedUrl) return null;

            return (
              <div key={index} className="relative aspect-video flex-1 min-w-[280px] overflow-hidden bg-black rounded-xl border border-white/10 shadow-lg group">
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>

                {/* ================= حماية الوضع العادي ================= */}
                <div className="absolute top-0 left-0 right-0 h-16 z-30 cursor-default bg-transparent pointer-events-auto"></div>
                <div className="absolute bottom-0 left-0 right-0 h-16 z-30 cursor-default bg-transparent pointer-events-auto"></div>
                <div className="absolute top-16 bottom-16 left-0 w-12 z-30 cursor-default bg-transparent pointer-events-auto"></div>
                <div className="absolute top-16 bottom-16 right-0 w-12 z-30 cursor-default bg-transparent pointer-events-auto"></div>

                {/* ================= زر التكبير المخصص داخل الموقع (بديل الفل سكرين) ================= */}
                <button
                  onClick={() => setModalVideoUrl(link)}
                  className="absolute top-3 left-3 z-40 bg-black/70 hover:bg-amber-500 hover:text-black text-white p-2 rounded-lg border border-white/20 transition-all shadow-md flex items-center justify-center"
                  title="تكبير الفيديو لشاشة كاملة داخل الموقع"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
                
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

      {/* ================= نافذة التكبير الكبيرة (Modal / Lightbox) ================= */}
      {modalVideoUrl && (
        <div className="fixed inset-0 z-[999999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col">
            
            {/* زر الإغلاق العلوي */}
            <button 
              onClick={() => setModalVideoUrl(null)}
              className="absolute top-4 left-4 z-50 bg-white/10 hover:bg-amber-500 hover:text-black text-white px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all border border-white/20 shadow-lg"
            >
              إغلاق ✕
            </button>

            {/* مشغل الفيديو الداخلي المحمي داخل النافذة الكبيرة */}
            <div className="relative w-full h-full">
              <iframe
                src={getEmbedUrl(modalVideoUrl, true) || ""}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>

              {/* طبقات حماية مطلقة داخل النافذة الكبيرة لمنع أي خروج لليوتيوب */}
              <div className="absolute top-0 left-0 right-0 h-20 z-30 bg-transparent pointer-events-auto"></div>
              <div className="absolute bottom-0 left-0 right-0 h-20 z-30 bg-transparent pointer-events-auto"></div>
              <div className="absolute top-20 bottom-20 left-0 w-16 z-30 bg-transparent pointer-events-auto"></div>
              <div className="absolute top-20 bottom-20 right-0 w-16 z-30 bg-transparent pointer-events-auto"></div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}