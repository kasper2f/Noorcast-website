import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X } from 'lucide-react'; 
import Loader from './Loader';

export default function MagazineGallery({ setActiveTab, initialCategory }: any) {
  const [images, setImages] = useState<any[]>([]);
  const [filter, setFilter] = useState('الكل');
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any>(null); // حالة لعرض الصورة البارزة (Lightbox)

  useEffect(() => {
    const baseUrl = 'https://script.google.com/macros/s/AKfycbzlL0sfoWhBFXXoLd9ZiPu6boq9WvLlalu4_kf6DkXMdQtmf-XMM32Hxrq0TzFPga3K/exec';
    const url = new URL(baseUrl);
    url.searchParams.append('action', 'getMagazine');

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const loadedImages = Array.isArray(data) ? data : [];
        setImages(loadedImages);
        
        // إذا جاءت خدمة من المتجر، نقوم بتفعيل الفلترة المؤقتة بناءً على الـ subCategory في الشيت
        if (initialCategory) {
          setFilter(initialCategory);
        }
        
        setLoading(false);
      })
      .catch(err => { console.error("Error:", err); setLoading(false); });
  }, [initialCategory]);

  // إبقاء أزرار الفلترة الأصلية في الواجهة كما هي تماماً (أثاث، أشخاص... إلخ) بناءً على الـ category الأساسي
  const categories = ['الكل', ...Array.from(new Set(images.map((img: any) => img.category).filter(Boolean)))];
  
  // فلترة الصور بذكاء: إذا كان المستخدم اختار من الأزرار أو جاء بـ initialCategory من المتجر يطابق الـ subCategory
  const filteredImages = images.filter((img: any) => {
    const imgSub = (img.subCategory || '').trim().toLowerCase();
    const imgCat = (img.category || '').trim().toLowerCase();
    const currentFilter = filter.trim().toLowerCase();

    // إذا كانت القيمة مساوية تماماً للـ subCategory القادم من المتجر أو مطابقة للزر المختار في الواجهة
    if (initialCategory && filter === initialCategory) {
      return imgSub === currentFilter || imgSub.includes(currentFilter) || currentFilter.includes(imgSub);
    }

    if (filter === 'الكل') return true;
    return imgCat === currentFilter;
  });

  // التعديل هنا: تغليف بيانات المنفذ في sourceProject
  const handleOrderSimilar = (img: any) => {
    const dataToSend = {
      ...img,
      sourceProject: {
        title: img.title,
        freelancerName: img.freelancerName,
        imageUrl: img.imageUrl
      }
    };
    setSelectedImage(null); // إغلاق نافذة المعاينة البارزة عند الانتقال
    setActiveTab(dataToSend); 
  };

  return (
    <div className="py-8 md:py-12 px-3 md:px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-4xl font-black text-white mb-2 md:mb-4">المجلة الفنية</h2>
        <p className="text-white/50 text-xs md:text-sm">استعرض أعمالنا بعدسة احترافية</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
        {categories.map((cat: any) => (
          <button key={cat} onClick={() => setFilter(cat)} className={`px-4 md:px-6 py-2 rounded-full text-xs font-bold transition-all border ${filter === cat ? 'bg-amber-500 text-black border-amber-500' : 'bg-transparent text-white border-white/10 hover:border-white/50'}`}>
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader text="جاري تحميل المجلة الفنية..." />
      ) : (
        <motion.div layout className="columns-2 md:columns-3 xl:columns-4 gap-3 md:gap-4">
          <AnimatePresence>
            {filteredImages.map((img: any) => (
              <motion.div 
                layout 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                key={img.id} 
                onClick={() => setSelectedImage(img)} // فتح الصورة كمعاينة بارزة عند الضغط عليها من الجوال أو اللابتوب
                className="mb-3 md:mb-4 break-inside-avoid rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group relative bg-zinc-900"
              >
                <img src={img.imageUrl} alt={img.title} className="w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                
                {/* Overlay التفاعلي للابتوب (عند مرور الماوس) */}
                <div className="absolute inset-0 bg-black/70 md:bg-black/60 opacity-0 md:group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 md:p-6 pointer-events-none md:pointer-events-auto">
                  <span className="text-amber-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-0.5 md:mb-1">{img.category}</span>
                  <p className="text-white text-xs md:text-sm font-bold mb-2 md:mb-4 line-clamp-2">{img.title}</p>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // منع انتشار الحدث لكي لا يفتح نافذة المعاينة بل يذهب للطلب مباشرة
                      handleOrderSimilar(img);
                    }}
                    className="flex items-center justify-center gap-1.5 md:gap-2 w-full py-1.5 md:py-2 bg-white text-black rounded-lg text-[10px] md:text-xs font-black hover:bg-amber-500 transition-colors"
                  >
                    <ShoppingCart size={12} className="shrink-0" /> طلب عمل مشابه
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* نافذة المعاينة البارزة (Lightbox Modal) للجوال واللابتوب */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="relative max-w-3xl w-full bg-[#121212] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 left-4 z-10 w-10 h-10 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-3/5 bg-black flex items-center justify-center max-h-[70vh] md:max-h-[80vh]">
                <img src={selectedImage.imageUrl} alt={selectedImage.title} className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain" />
              </div>

              <div className="w-full md:w-2/5 p-6 flex flex-col justify-between bg-[#121212]">
                <div className="space-y-3">
                  <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest">{selectedImage.category}</span>
                  <h3 className="text-lg md:text-xl font-black text-white">{selectedImage.title}</h3>
                  {selectedImage.description && (
                    <p className="text-white/60 text-xs leading-relaxed">{selectedImage.description}</p>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <button 
                    onClick={() => handleOrderSimilar(selectedImage)}
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-amber-500 text-black rounded-xl text-xs md:text-sm font-black hover:bg-amber-400 transition-all shadow-lg"
                  >
                    <ShoppingCart size={16} /> طلب عمل مشابه
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}