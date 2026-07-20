import React from 'react';
import { Send, Clock, PhoneCall, Rocket } from 'lucide-react';

export default function Workflow() {
  const steps = [
    {
      number: "01",
      title: "أرسل طلبك",
      description: "اختر خدمتك أو باقتك المفضلة وأرسل التفاصيل بكل سهولة.",
      icon: <Send className="text-amber-500" size={24} />
    },
    {
      number: "02",
      title: "نراجع التفاصيل",
      description: "فريقنا المختص يدرس مشروعك ويتواصل معك خلال 24 ساعة.",
      icon: <Clock className="text-amber-500" size={24} />
    },
    {
      number: "03",
      title: "نتواصل معك",
      description: "نؤكد كافة التفاصيل ونرتب خطة العمل المخصصة لمشروعك.",
      icon: <PhoneCall className="text-amber-500" size={24} />
    },
    {
      number: "04",
      title: "يبدأ التنفيذ",
      description: "ننطلق فوراً في تحويل فكرتك إلى واقع إبداعي استثنائي.",
      icon: <Rocket className="text-amber-500" size={24} />
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12 md:mb-16">
        <span className="text-xs font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">خطوات العمل</span>
        <h3 className="text-2xl md:text-4xl font-black text-white mt-4">كيف نبدأ رحلة النجاح معاً؟</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="bg-[#121212] p-6 rounded-3xl border border-white/5 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between relative group shadow-lg"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <span className="text-2xl font-black text-white/10 group-hover:text-amber-500/30 transition-colors">
                  {step.number}
                </span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
              <p className="text-white/60 text-xs md:text-sm leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}