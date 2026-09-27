import React, { useState, useEffect } from 'react';
import { LayoutGrid, Briefcase, Users, Package, Search, Camera, Menu, X, Mail, Globe } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [currentLang, setCurrentLang] = useState('ar');

  // قراءة اللغة وتغيير اتجاه الموقع بالكامل (RTL / LTR)
  useEffect(() => {
    const isEnglish = document.cookie.includes('googtrans=/ar/en');
    setCurrentLang(isEnglish ? 'en' : 'ar');
    
    // هذا السطر هو السحر الذي يقلب الموقع لليسار عند اختيار الإنجليزي
    document.documentElement.dir = isEnglish ? 'ltr' : 'rtl';
    document.documentElement.lang = isEnglish ? 'en' : 'ar';
  }, []);

  const menuItems = [
    { name: 'الرئيسية', tab: 'home', icon: <LayoutGrid size={16} /> },
    { name: 'معرض أعمالنا', tab: 'portfolio', icon: <Briefcase size={16} /> },
    { name: 'المجلة الفنية', tab: 'magazine', icon: <Camera size={16} /> },
    { name: 'المتجر والخدمات', tab: 'store', icon: <Package size={16} /> },
    { name: 'شركاء النجاح', tab: 'partners', icon: <Users size={16} /> },
    { name: 'تتبع طلبك', tab: 'tracker', icon: <Search size={16} /> },
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  // دالة تغيير اللغة المعدلة لتعمل على السيرفر الحي (الإنترنت) دون تعليق
  const switchLanguage = (langCode: string) => {
    const domain = window.location.hostname;
    
    if (langCode === 'en') {
      // تفعيل الإنجليزية محلياً وعلى الدومين
      document.cookie = `googtrans=/ar/en; path=/`;
      document.cookie = `googtrans=/ar/en; domain=.${domain}; path=/`;
    } else {
      // إجبار جوجل على العودة للعربية
      document.cookie = `googtrans=/ar/ar; path=/`;
      document.cookie = `googtrans=/ar/ar; domain=.${domain}; path=/`;
      
      // التدمير الشامل لكوكيز الإنجليزية السابقة لضمان عدم التعليق
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${domain}; path=/`;
      document.cookie = `googtrans=/ar/en; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      document.cookie = `googtrans=/ar/en; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${domain}; path=/`;
    }
    
    window.location.reload();
  };

  const scrollToFooter = () => {
    setMobileMenuOpen(false);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleLogoClick = () => {
    setLogoClicks(prev => {
      const newCount = prev + 1;
      if (newCount === 3) {
        setActiveTab('admin');
        return 0;
      }
      setTimeout(() => setLogoClicks(0), 1000);
      return newCount;
    });
    if (logoClicks === 0) {
      handleTabClick('home');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0B] border-b border-white/10 px-4 md:px-6 py-3">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-2 md:gap-4">
        
        <div 
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity relative shrink-0" 
          onClick={handleLogoClick}
          title="NoorCast"
        >
          <div className="w-14 h-12 md:w-16 md:h-14 flex items-center justify-center -ml-2 relative shrink-0"> 
            <img 
              src="https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782727817/WhatsApp_Image_2026-06-21_at_12.56.07_AM_dhzswc.png" 
              alt="Noorcast Logo" 
              className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
            />
          </div>

          <div className={`whitespace-nowrap ${currentLang === 'en' ? 'ml-2 text-left' : 'text-right'}`}>
            <h1 className="text-lg md:text-[24px] lg:text-[28px] font-bold text-white leading-tight">NoorCast</h1>
            <span className="text-[6px] md:text-[7px] text-purple-400 tracking-[0.2em] uppercase font-black block">Creative Solutions</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center justify-center flex-1 gap-1 xl:gap-3">
          {menuItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => handleTabClick(item.tab)}
              className={`flex items-center gap-1.5 text-xs xl:text-sm font-bold transition-all px-2.5 py-2 rounded-xl whitespace-nowrap ${
                activeTab === item.tab 
                  ? 'bg-purple-600 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="shrink-0">{item.icon}</span> {item.name}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-2">
            
            {/* زر تغيير اللغة - لابتوب */}
            <button 
              onClick={() => switchLanguage(currentLang === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1.5 text-white/70 hover:text-white px-3 py-2 rounded-full font-bold text-xs lg:text-sm border border-white/10 hover:border-white/30 transition-all whitespace-nowrap"
            >
              <Globe size={16} className="text-purple-400 shrink-0" />
              <span>{currentLang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            <button 
              onClick={scrollToFooter}
              className="text-white/70 hover:text-white px-3 py-2 rounded-full font-bold text-xs lg:text-sm border border-white/10 hover:border-white/30 transition-all whitespace-nowrap"
            >
              تواصل معنا
            </button>
            <button 
              onClick={() => handleTabClick('store')}
              className="bg-white text-black px-4 lg:px-5 py-2 rounded-full font-bold text-xs lg:text-sm hover:bg-purple-500 hover:text-white transition-all shadow-md whitespace-nowrap"
            >
              اطلب باقتك
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative text-white bg-white/5 p-2 rounded-xl border border-white/10 hover:bg-white/10 transition-all focus:outline-none shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} className="text-purple-400" /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0A0A0B]/95 backdrop-blur-xl border-b border-white/10 p-5 shadow-2xl flex flex-col gap-3 animate-fadeIn">
          {menuItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => handleTabClick(item.tab)}
              className={`flex items-center gap-3 text-sm font-bold transition-all px-4 py-3 rounded-xl w-full ${currentLang === 'en' ? 'text-left' : 'text-right'} ${
                activeTab === item.tab 
                  ? 'bg-purple-600 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}

          <div className="border-t border-white/10 pt-3 mt-1 flex flex-col gap-2.5">
            {/* زر تغيير اللغة - جوال */}
            <button 
              onClick={() => switchLanguage(currentLang === 'ar' ? 'en' : 'ar')}
              className="flex items-center justify-center gap-2 text-white/80 hover:text-white text-sm font-bold border border-white/10 py-3 rounded-xl transition-all w-full"
            >
              <Globe size={16} className="text-purple-400" /> {currentLang === 'ar' ? 'English' : 'العربية'}
            </button>

            <button 
              onClick={scrollToFooter}
              className="flex items-center justify-center gap-2 text-white/80 hover:text-white text-sm font-bold border border-white/10 py-3 rounded-xl transition-all w-full"
            >
              <Mail size={16} /> تواصل معنا
            </button>
            <button 
              onClick={() => handleTabClick('store')}
              className="bg-purple-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-purple-500 transition-all text-center shadow-lg"
            >
              اطلب باقتك الآن
            </button>
          </div>
        </div>
      )}
    </header>
  );
}