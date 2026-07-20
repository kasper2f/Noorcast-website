import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { BUNDLE_CATEGORIES, DISCOUNT_TIERS } from '../Data/bundleConfig';
import BookingModal from './BookingModal';

const BASE_PACKAGES = [
  { id: 'photography_launch', category: 'photography', services: ['photo_1day', 'reels_8', 'photos_20', 'full_montage'], price: 3990 },
];

export default function CustomBundleBuilder({ isOpen, onClose, categoryType }: { isOpen: boolean; onClose: () => void; categoryType: keyof typeof BUNDLE_CATEGORIES }) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string, discount: number } | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  
  const categoryData = BUNDLE_CATEGORIES[categoryType];
  
  // التحقق مما إذا كان القسم الحالي هو أحد حلول الأعمال الثابتة
  const isSolutionBundle = categoryType.startsWith('solution_');
  const MIN_SERVICES = isSolutionBundle ? 1 : 3;

  const toggleService = (id: string) => {
    setSelectedServices(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // تحويل معرفات الخدمات إلى أسمائها الحقيقية للعرض في الطلب
  const selectedServiceNames = useMemo(() => {
    if (!categoryData) return [];
    return categoryData.services
      .filter(s => selectedServices.includes(s.id))
      .map(s => s.title);
  }, [selectedServices, categoryData]);

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setIsVerifying(true);
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbzlL0sfoWhBFXXoLd9ZiPu6boq9WvLlalu4_kf6DkXMdQtmf-XMM32Hxrq0TzFPga3K/exec", {
        method: "POST",
        body: JSON.stringify({ code: couponCode })
      });
      const text = await response.text();
      if (text.includes("Success")) {
        setAppliedCoupon({ code: couponCode, discount: 0.1 });
      } else {
        try {
          const data = JSON.parse(text);
          const result = Array.isArray(data) ? data[0] : data;
          if (result && (result.isValid || result.discount)) {
            setAppliedCoupon({ code: couponCode, discount: parseFloat(result.discount) || 0 });
          }
        } catch (e) { console.error("خطأ في قراءة الرد"); }
      }
    } catch (error) { console.error("خطأ في التحقق:", error); }
    setIsVerifying(false);
  };

  const totals = useMemo(() => {
    if (!categoryData) return { rawPrice: 0, finalPrice: 0, totalPoints: 0, discount: 0 };
    const selected = categoryData.services.filter(s => selectedServices.includes(s.id));
    const totalPoints = selected.reduce((sum, s) => sum + (s.points || 0), 0);
    let rawPrice = selected.reduce((sum, s) => sum + (s.price || 0), 0);
    
    // حلول الأعمال تعتمد على السعر المباشر للخدمات المختارة بدون خصومات النقاط التراكمية
    const discount = isSolutionBundle ? 0 : (
      [...DISCOUNT_TIERS].reverse().find(t => totalPoints >= t.points)?.discount || 0
    );
    
    const finalPrice = (rawPrice * (1 - discount)) * (appliedCoupon ? (1 - appliedCoupon.discount) : 1);
    return { rawPrice, finalPrice, totalPoints, discount };
  }, [selectedServices, categoryData, appliedCoupon, isSolutionBundle]);

  const progress = Math.min((totals.totalPoints / 120) * 100, 100);
  const isBelowMinimum = selectedServices.length < MIN_SERVICES;

  if (!isOpen || !categoryData) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#121212] border border-white/10 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col md:flex-row">
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-white">{categoryData.title}</h2>
              <button onClick={onClose}><X className="text-white/50" /></button>
            </div>
            
            {/* إخفاء شريط ونقاط التقدم في حلول الأعمال لعدم الحاجة إليها */}
            {!isSolutionBundle && (
              <div className="mb-8 bg-white/5 p-4 rounded-xl">
                 <div className="flex justify-between text-xs mb-2 text-white/60"><span>اختر ما يناسب مشروعك (تصميم باقتك الخاصة)</span><span>{totals.totalPoints} نقطة</span></div>
                 <div className="h-2 bg-black/40 rounded-full overflow-hidden"><motion.div className="h-full bg-amber-500" animate={{ width: `${progress}%` }} /></div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryData.services.map(s => (
                <button key={s.id} onClick={() => toggleService(s.id)} className={`p-4 rounded-xl border transition-all text-right flex justify-between items-center ${selectedServices.includes(s.id) ? 'border-amber-500 bg-amber-500/10' : 'border-white/5 bg-black/20'}`}>
                  <div>
                    <span className="text-sm font-bold block text-white">{s.title}</span>
                    {/* إخفاء السعر المنفصل أسفل الخدمة في حلول الأعمال */}
                    {!isSolutionBundle && <span className="text-[10px] text-amber-500 font-bold">{s.price} ر.س</span>}
                  </div>
                  {selectedServices.includes(s.id) && <CheckCircle size={18} className="text-amber-500" />}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full md:w-80 bg-black/20 p-8 border-r border-white/5 flex flex-col">
            <h3 className="font-black text-white mb-6">ملخص تصميمك</h3>
            <div className="mb-6 space-y-4 text-sm flex-grow">
              <div className="flex justify-between text-white/60"><span>الخدمات المختارة</span><span className="font-bold text-white">{selectedServices.length}</span></div>
              <AnimatePresence mode="wait">
                {!isBelowMinimum ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 pt-4 border-t border-white/10">
                    {!isSolutionBundle && (
                      <div className="flex justify-between items-center text-[10px] text-amber-500 font-bold"><span>خصم تلقائي: {Math.round(totals.discount * 100)}%</span></div>
                    )}
                    <div className="flex gap-2">
                      <input type="text" placeholder="كود الخصم" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white" />
                      <button onClick={handleApplyCoupon} disabled={isVerifying} className="bg-white/10 px-3 rounded-lg text-xs font-bold text-white hover:bg-white/20">تطبيق</button>
                    </div>
                    {appliedCoupon && <p className="text-[10px] text-green-500 font-bold">✓ خصم إضافي ({appliedCoupon.discount * 100}%)</p>}
                    
                    {!isSolutionBundle && (
                      <>
                        <div className="flex justify-between"><span>القيمة الأصلية</span><span>{Math.round(totals.rawPrice)} ر.س</span></div>
                        <div className="flex justify-between text-green-500"><span>مبلغ التوفير</span><span>-{Math.round(totals.rawPrice - totals.finalPrice)} ر.س</span></div>
                      </>
                    )}

                    <div className="flex justify-between font-black text-lg text-white pt-2 border-t border-white/5"><span>السعر النهائي</span><span>{Math.round(totals.finalPrice)} ر.س</span></div>
                  </motion.div>
                ) : <p className="text-[11px] text-white/50 text-center pt-6 border-t border-white/10">{isSolutionBundle ? 'قم باختيار خدمة واحدة على الأقل لتفعيل الباقة.' : 'قم بإضافة 3 خدمات على الاقل لتفعيل الباقة والاستفادة من الخصومات.'}</p>}
              </AnimatePresence>
            </div>
            <button onClick={() => setShowBooking(true)} disabled={isBelowMinimum} className={`w-full py-4 rounded-xl font-black transition-all ${isBelowMinimum ? 'bg-white/5 text-white/20' : 'bg-amber-500 text-black hover:bg-amber-400'}`}>
              المتابعة للحجز والطلب
            </button>
          </div>
        </motion.div>
      </div>

      <BookingModal 
        isOpen={showBooking} 
        onClose={() => setShowBooking(false)} 
        selectedPackage={{ 
            title: `باقة مخصصة: ${categoryData.title}`, 
            price: Math.round(totals.finalPrice) + " ر.س",
            couponCode: appliedCoupon?.code || 'لا يوجد',
            discountAmount: Math.round(totals.rawPrice - totals.finalPrice) + " ر.س",
            services: selectedServiceNames 
        }} 
      />
    </>
  );
}