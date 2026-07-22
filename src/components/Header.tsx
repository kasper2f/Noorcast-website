import React, { useState, useEffect } from 'react';
import { LayoutGrid, Briefcase, Users, Package, Search, Camera, Menu, X, Mail } from 'lucide-react';
import { ref, getDatabase, onValue } from 'firebase/database';

export default function Header({ activeTab, setActiveTab }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadChatsCount, setUnreadChatsCount] = useState(0);
  const [logoClicks, setLogoClicks] = useState(0);

  // مراقبة المحادثات في الفايربيز لتحديث عداد الإشعارات في الخلفية
  useEffect(() => {
    const db = getDatabase();
    const chatsRef = ref(db, 'chats');
    return onValue(chatsRef, (snapshot) => {
      if (snapshot.exists()) {
        const chatsData = snapshot.val();
        const users = Object.keys(chatsData);
        let unreadCount = 0;
        users.forEach(user => {
          const userMessages = chatsData[user];
          if (userMessages) {
            const msgsArray = Object.values(userMessages) as any[];
            const lastMsg = msgsArray[msgsArray.length - 1];
            if (lastMsg && lastMsg.sender !== 'admin') {
              unreadCount++;
            }
          }
        });
        setUnreadChatsCount(unreadCount);
      } else {
        setUnreadChatsCount(0);
      }
    });
  }, []);

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

  // دالة التمرير المباشر نحو أسفل الصفحة (الفوتر) عند الضغط على "تواصل معنا"
  const scrollToFooter = () => {
    setMobileMenuOpen(false);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  // دالة الضغط السري على الشعار (3 ضغطات متتالية تفتح لوحة الإدارة)
  const handleLogoClick = () => {
    setLogoClicks(prev => {
      const newCount = prev + 1;
      if (newCount === 3) {
        setActiveTab('admin');
        return 0; // إعادة تعيين العداد
      }
      // إعادة تعيين العداد إذا تأخر المستخدم في الضغطات (خلال ثانية واحدة)
      setTimeout(() => setLogoClicks(0), 1000);
      return newCount;
    });
    // الانتقال للرئيسية إذا لم تتم الـ 3 ضغطات
    if (logoClicks === 0) {
      handleTabClick('home');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0B] border-b border-white/10 px-4 md:px-6 py-3">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        
        {/* الشعار مع ميزة الضغط السري (3 مرات) */}
        <div 
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity relative" 
          onClick={handleLogoClick}
          title="NoorCast"
        >
          <div className="w-16 h-14 md:w-20 md:h-18 flex items-center justify-center -ml-2 md:-ml-3 relative"> 
            <img 
              src="https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782727817/WhatsApp_Image_2026-06-21_at_12.56.07_AM_dhzswc.png" 
              alt="Noorcast Logo" 
              className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
            />
            {/* شارة إشعارات خفية تظهر على الشعار إذا كانت هناك رسائل جديدة لتنبهك */}
            {unreadChatsCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold animate-pulse shadow-md">
                {unreadChatsCount}
              </span>
            )}
          </div>

          <div className="text-right">
            <h1 className="text-xl md:text-[28px] font-bold text-white leading-tight">NoorCast</h1>
            <span className="text-[7px] md:text-[8px] text-purple-400 tracking-[0.2em] uppercase font-black block">Creative Solutions</span>
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

        {/* جهة اليسار (أزرار تواصل معنا واطلب باقتك وإظهار زر القائمة في الجوال) */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={scrollToFooter}
              className="text-white/70 hover:text-white px-4 py-2.5 rounded-full font-bold text-sm border border-white/10 hover:border-white/30 transition-all"
            >
              تواصل معنا
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
            className="lg:hidden relative text-white bg-white/5 p-2.5 rounded-xl border border-white/10 hover:bg-white/10 transition-all focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} className="text-purple-400" /> : <Menu size={22} />}
            {unreadChatsCount > 0 && !mobileMenuOpen && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold animate-pulse">
                {unreadChatsCount}
              </span>
            )}
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