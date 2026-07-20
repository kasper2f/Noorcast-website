import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react'; 
import { FaWhatsapp, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Footer({ setActiveTab }: any) {
  const links = [
    { name: 'الرئيسية', tab: 'home' },
    { name: 'معرض الأعمال (البورتفوليو)', tab: 'portfolio' },
    { name: 'باقات الخدمات والمتجر', tab: 'store' },
    { name: 'شركاء النجاح', tab: 'partners' },
    { name: 'تتبع حجزك وطلبك', tab: 'tracker' },
  ];

  const handleLinkClick = (tabName: string) => {
    setActiveTab(tabName);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // سحب الصفحة لأعلى فور الضغط لضمان رؤية التبويب الجديد
  };

  return (
    <footer className="bg-[#050505] border-t border-amber-500/10 pt-14 md:pt-20 pb-8 md:pb-10 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
        
        {/* العمود الأول: نبذة عن نوركاست */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 shrink-0 flex items-center justify-center">
              <img 
                src="https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782727817/WhatsApp_Image_2026-06-21_at_12.56.07_AM_dhzswc.png" 
                alt="Noorcast Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-lg md:text-xl font-black text-white tracking-wide">نوركاست</h3>
          </div>
          <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-xs">
            مؤسستنا متخصصة في تقديم حلول إنتاج فني متكامل وصناعة محتوى ترويجي وسينمائي وتطوير حسابات السوشل ميديا للشركات والعلامات التجارية الرائدة لمضاعفة النمو والوصول الرقمي.
          </p>
          <div className="flex gap-3">
            {/* رابط الواتساب */}
            <a href="https://wa.me/966541550160" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-emerald-500 hover:text-black cursor-pointer transition-all duration-300 text-white/40">
              <FaWhatsapp size={16} />
            </a>
            {/* رابط تيك توك */}
            <a href="https://www.tiktok.com/@noorcast.sa" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-white hover:text-black cursor-pointer transition-all duration-300 text-white/40">
              <FaTiktok size={14} />
            </a>
            {/* رابط انستقرام */}
            <a href="https://www.instagram.com/noorcast.sa" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-pink-600 hover:text-white cursor-pointer transition-all duration-300 text-white/40">
              <FaInstagram size={16} />
            </a>
          </div>
        </div>

        {/* العمود الثاني: روابط سريعة */}
        <div className="space-y-4 md:space-y-6">
          <h4 className="font-bold text-base md:text-lg text-white">روابط سريعة</h4>
          <ul className="space-y-3 md:space-y-4">
            {links.map((link) => (
              <li key={link.tab}>
                <button 
                  onClick={() => handleLinkClick(link.tab)}
                  className="text-white/50 hover:text-purple-400 transition-colors text-xs md:text-sm flex items-center group text-right py-2 cursor-pointer w-full bg-transparent border-0 outline-none"
                >
                  <span className="w-1 h-1 rounded-full bg-purple-500 mr-2 group-hover:scale-150 transition-transform shrink-0" />
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* العمود الثالث: معلومات الاتصال الفعالة */}
        <div className="space-y-4 md:space-y-6">
          <h4 className="font-bold text-base md:text-lg text-white">معلومات الاتصال</h4>
          <div className="space-y-3 md:space-y-4 text-xs md:text-sm text-white/50">
            <div className="flex items-center gap-3 hover:text-purple-400 transition-colors cursor-pointer">
              <MapPin size={16} className="text-purple-500 shrink-0" />
              <span>الرياض، المملكة العربية السعودية</span>
            </div>
            {/* تم تفعيل البريد الإلكتروني ليفتح تطبيق البريد مباشرة */}
            <a href="mailto:info@noorcast.com" className="flex items-center gap-3 hover:text-purple-400 transition-colors cursor-pointer block">
              <Mail size={16} className="text-purple-500 shrink-0" />
              <span>info@noorcast.com</span>
            </a>
            {/* تم تفعيل رقم الاتصال ليبدأ الاتصال الهاتفي فوراً عند الضغط عليه من الجوال */}
            <a href="tel:+966541550160" className="flex items-center gap-3 hover:text-purple-400 transition-colors cursor-pointer block">
              <Phone size={16} className="text-purple-500 shrink-0" />
              <span dir="ltr">+966 54 155 0160</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-10 md:mt-16 pt-6 md:pt-8 border-t border-purple-500/10 text-center text-[10px] text-white/20 uppercase tracking-widest">
        جميع الحقوق محفوظة © نوركاست 2026
      </div>
    </footer>
  );
}