import React, { useState } from 'react';
import { LayoutGrid, Briefcase, Users, Package, Search, Lock, Camera, Menu, X } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'الرئيسية', tab: 'home', icon: <LayoutGrid size={18} /> },
    { name: 'معرض أعمالنا', tab: 'portfolio', icon: <Briefcase size={18} /> },
    { name: 'المجلة الفنية', tab: 'magazine', icon: <Camera size={18} /> },
    { name: 'المتجر والخدمات', tab: 'store', icon: <Package size={18} /> },
    { name: 'شركاء النجاح', tab: 'partners', icon: <Users size={18} /> },
    { name: 'تتبع طلبك', tab: 'tracker', icon: <Search size={18} /> },
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false); // إغلاق القائمة تلقائياً عند الضغط على أي خيار في الجوال
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0B] border-b border-white/10 px-4 md:px-6 py-3">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        
        {/* الشعار */}
        <div 
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={() => handleTabClick('home')}
        >
          <div className="w-16 h-14 md:w-20 md:h-18 flex items-center justify-center -ml-2 md:-ml-3"> 
            <img 
              src="https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782727817/WhatsApp_Image_2026-06-21_at_12.56.07_AM_dhzswc.png" 
              alt="Noorcast Logo" 
              className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
            />
          </div>

          <div className="text-right">
            <h1 className="text-xl md:text-[28px] font-bold text-white leading-tight">NoorCast</h1>
            <span className="text-[7px] md:text-[8px] text-purple-400 tracking-[0.2em] uppercase font-black block">CREATIVE PRODUCTION</span>
          </div>
        </div>

        {/* القائمة (تظهر في اللابتوب فقط وتختفي في الجوال) */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
          {menuItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => handleTabClick(item.tab)}
              className={`flex items-center gap-2 text-sm font-bold transition-all px-3 py-2 rounded-xl ${
                activeTab === item.tab 
                  ? 'bg-purple-600 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </nav>

        {/* جهة اليسار (أزرار اللابتوب وإظهار زر القائمة في الجوال) */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => handleTabClick('admin')}
              className="flex items-center gap-2 text-white/50 hover:text-white text-sm font-bold border border-white/10 px-4 py-2 rounded-xl transition-all"
            >
              <Lock size={16} /> لوحة الإدارة
            </button>
            <button 
              onClick={() => handleTabClick('store')}
              className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-purple-500 hover:text-white transition-all shadow-md"
            >
              اطلب باقتك الآن
            </button>
          </div>

          {/* زر القائمة المنسدلة للجوال (Hamburger Menu Button) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white bg-white/5 p-2.5 rounded-xl border border-white/10 hover:bg-white/10 transition-all focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} className="text-purple-400" /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* قائمة الجوال المنسدلة (تفتح وتغلق بسلاسة بناءً على حالة الزر) */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0A0A0B]/95 backdrop-blur-xl border-b border-white/10 p-5 shadow-2xl flex flex-col gap-3 animate-fadeIn">
          {menuItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => handleTabClick(item.tab)}
              className={`flex items-center gap-3 text-sm font-bold transition-all px-4 py-3 rounded-xl w-full text-right ${
                activeTab === item.tab 
                  ? 'bg-purple-600 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}

          <div className="border-t border-white/10 pt-3 mt-1 flex flex-col gap-2.5">
            <button 
              onClick={() => handleTabClick('admin')}
              className="flex items-center justify-center gap-2 text-white/70 hover:text-white text-sm font-bold border border-white/10 py-3 rounded-xl transition-all w-full"
            >
              <Lock size={16} /> لوحة الإدارة
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