import React from 'react';
import { partners } from '../Data/data';

export default function Partners() {
  return (
    <section className="bg-[#050505] text-white py-24 px-6 border-t border-white/5 w-full">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black">شركاء النجاح والمسيرة الرقمية</h2>
          <p className="text-amber-500 font-medium text-sm md:text-base">
            نعمل جنباً إلى جنب مع كبرى العلامات التجارية لتحقيق رؤية استثنائية
          </p>
        </div>

        {/* الشبكة - تعتمد الآن على البيانات المستوردة من Data/data.ts مع دعم التحكم بحجم اللوجو وقلب الألوان */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 w-full">
          {partners.map((partner) => (
            <div 
              key={partner.id} 
              className="bg-zinc-900/40 p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center hover:bg-amber-500/10 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-white/10 rounded-full mb-3 flex items-center justify-center overflow-hidden border border-white/10">
                <img 
                  src={partner.logoUrl} 
                  alt={partner.name} 
                  // تم تطبيق خاصية logoScale للتحكم بالحجم، وخاصية invert لقلب اللون إذا كان true
                  className={`object-contain p-2 transition-transform duration-300 ${partner.logoScale || 'scale-100'} ${partner.invert ? 'brightness-0 invert' : ''}`}
                />
              </div>
              <h3 className="text-xs font-bold text-white mt-1">{partner.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}