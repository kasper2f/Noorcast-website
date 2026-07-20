import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createOrder } from '../dbService';

export default function BookingModal({ isOpen, onClose, selectedPackage, customServices, selectedAddons }: any) {
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', socials: '', details: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.whatsapp) {
      alert('يرجى تعبئة الحقول المطلوبة (الاسم، البريد، واتساب)');
      return;
    }

    setIsSubmitting(true);
    const orderId = 'NC-' + Math.floor(1000 + Math.random() * 9000);
    
    // بناء نص التفاصيل بشكل رأسي منظم (تماماً مثل الشكل المطلوب)
    let detailsParts: string[] = [];

    // 1. إضافة الخدمات المختارة بشكل عمودي
    if (selectedPackage?.services && Array.isArray(selectedPackage.services) && selectedPackage.services.length > 0) {
      detailsParts.push("--- الإضافات المختارة ---");
      selectedPackage.services.forEach((serviceName: string) => {
        detailsParts.push(`• ${serviceName}`);
      });
    }

    // 2. إضافة الإضافات (Addons) إن وجدت بشكل عمودي
    if (selectedAddons && Object.keys(selectedAddons).length > 0) {
      if (detailsParts.length > 0) detailsParts.push(""); // مسافة فارغة للتنسيق
      detailsParts.push("--- الإضافات الإضافية ---");
      Object.entries(selectedAddons).forEach(([sId, addons]) => {
        Object.entries(addons as any).forEach(([aTitle, qty]) => {
          if ((qty as number) > 0) {
            detailsParts.push(`• ${aTitle} (x${qty})`);
          }
        });
      });
    }

    // 3. إضافة ملاحظات العميل الخاصة إن وجدت
    if (formData.details && formData.details.trim() !== "") {
      if (detailsParts.length > 0) detailsParts.push(""); // مسافة فارغة
      detailsParts.push("--- ملاحظات العميل ---");
      detailsParts.push(formData.details.trim());
    }

    // دمج جميع الأجزاء بأسطر جديدة لضمان ظهورها بشكل رأسي مرتب في قوقل شيت
    const finalDetails = detailsParts.join('\n');

    try {
      const orderData = {
        orderId: orderId,
        packageName: selectedPackage?.title || "باقة غير معروفة",
        price: selectedPackage?.price || "0",
        customerName: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        socials: formData.socials,
        details: finalDetails, // التفاصيل مرتبة رأسياً الآن
        status: 'جديد',
        createdAt: new Date().toLocaleDateString('ar-SA'),
        couponCode: selectedPackage?.couponCode || 'لا يوجد',
        discountAmount: selectedPackage?.discountAmount || '0 ر.س',
        freelancerName: selectedPackage?.sourceProject?.freelancerName || 'لا يوجد',
        projectImageUrl: selectedPackage?.sourceProject?.imageUrl || selectedPackage?.sourceProject?.mediaUrl || 'لا يوجد'
      };

      await createOrder(orderData);
      
      alert('تم إرسال طلبك بنجاح! رقم طلبك هو: ' + orderId);
      onClose();
    } catch (e) {
      console.error("خطأ الإرسال:", e);
      alert('حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm p-3 md:p-4 flex items-center justify-center overflow-y-auto"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          exit={{ scale: 0.95, opacity: 0 }} 
          className="bg-[#121212] border border-white/5 p-5 sm:p-6 md:p-8 rounded-3xl w-full max-w-lg relative shadow-[0_0_50px_rgba(0,0,0,0.5)] my-auto max-h-[90vh] overflow-y-auto scrollbar-none"
        >
          <button onClick={onClose} className="absolute top-5 left-5 md:top-6 md:right-6 text-white/30 hover:text-white transition-colors"><X size={20} /></button>
          
          <h2 className="text-lg md:text-xl font-black text-white mb-1">إكمال حجز خدماتك</h2>
          
          <div className="bg-black border border-white/5 p-3.5 md:p-4 rounded-xl mb-5 md:mb-6 mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-white/40 text-[10px] md:text-xs uppercase tracking-widest">سلتك الحالية:</span>
              <span className="text-white font-bold text-xs md:text-sm truncate mr-2 max-w-[200px]">{selectedPackage?.title}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-amber-500 text-xs font-bold">الإجمالي المستحق:</span>
              <span className="text-white font-black text-base md:text-lg">{selectedPackage?.price}</span>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <input onChange={(e) => setFormData({...formData, name: e.target.value})} type="text" placeholder="اسمك بالكامل (أو اسم المؤسسة) *" className="w-full bg-black border border-white/5 p-3 rounded-xl text-xs md:text-sm text-white focus:border-amber-500 outline-none transition-all" />
            <input onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" placeholder="البريد الإلكتروني *" className="w-full bg-black border border-white/5 p-3 rounded-xl text-xs md:text-sm text-white focus:border-amber-500 outline-none transition-all" />
            <input onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} type="tel" placeholder="رقم الجوال النشط (واتساب) *" className="w-full bg-black border border-white/5 p-3 rounded-xl text-xs md:text-sm text-white focus:border-amber-500 outline-none transition-all" />
            <input onChange={(e) => setFormData({...formData, socials: e.target.value})} type="text" placeholder="حسابات التواصل الاجتماعي الحالية (إن وجدت)" className="w-full bg-black border border-white/5 p-3 rounded-xl text-xs md:text-sm text-white focus:border-amber-500 outline-none transition-all" />
            <textarea onChange={(e) => setFormData({...formData, details: e.target.value})} placeholder="تفاصيل أو طلبات خاصة تود مشاركتها معنا" className="w-full bg-black border border-white/5 p-3 rounded-xl text-xs md:text-sm text-white h-20 md:h-24 outline-none focus:border-amber-500 transition-all"></textarea>
          </div>

          <div className="mt-5 p-3.5 md:p-4 bg-amber-500/5 rounded-xl border border-amber-500/10 text-center">
            <p className="text-[10px] md:text-[11px] text-white/50 leading-relaxed">
              <span className="text-amber-500 font-bold flex items-center justify-center gap-1.5 mb-1">
                <ShieldCheck size={14} /> تنويه أمان:
              </span>
              لن يُطلب منك أي مبالغ أو بيانات بطاقة حالياً. سيقوم فريقنا بمراجعة طلبك والتواصل معك فوراً.
            </p>
          </div>

          <div className="flex gap-3 mt-5 md:mt-6">
            <button onClick={onClose} className="flex-1 py-3 text-xs md:text-sm font-bold text-white/40 hover:text-white transition-all">إلغاء</button>
            <button 
              onClick={handleSubmit} 
              disabled={isSubmitting} 
              className="flex-[2] bg-amber-500 text-black px-6 md:px-8 py-3 rounded-xl font-black text-xs md:text-sm hover:bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب مباشرة'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}