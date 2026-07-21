import React, { useEffect, useState } from 'react';
import { CheckCircle, ShieldCheck, Search, PlusCircle, MinusCircle, Sparkles, Tag, LayoutDashboard, ShoppingCart, X, Eye } from 'lucide-react';
import BookingModal from './BookingModal';
import CustomBundleBuilder from './CustomBundleBuilder';
import Loader from './Loader';
import { getServices, getCoupons } from '../dbService';
import { businessSolutions, packageCategories } from '../Data/data';
import { BUNDLE_CATEGORIES } from '../Data/bundleConfig';

export default function Store({ preselectedCategory, onOrderSuccess, onOrderSimilar, sourceProject, targetServiceId, onClearTarget }: any) {
  // قائمة أقسام الباقات الجاهزة الرئيسية للتحقق الذكي
  const packageCategoryNames = ['إدارة المحتوى', 'المتاجر الإلكترونية', 'المواقع الإلكترونية', 'الهوية البصرية', 'التصوير الشهري'];

  const [activeTab, setActiveTab] = useState<'packages' | 'services' | 'solutions'>(
    preselectedCategory && packageCategoryNames.includes(preselectedCategory) ? 'packages' : 'packages'
  );
  const [activePackageCat, setActivePackageCat] = useState('cat2');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBundleType, setActiveBundleType] = useState<keyof typeof BUNDLE_CATEGORIES | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false); // حالة فتح عربة الجوال العائمة
  
  const [selectedAddons, setSelectedAddons] = useState<Record<string, Record<string, number>>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const [coupons, setCoupons] = useState<any[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [ourServices, setOurServices] = useState<any[]>([]);

  useEffect(() => {
    if (preselectedCategory) {
      if (packageCategoryNames.includes(preselectedCategory)) {
        setActiveTab('packages');
        const matchedCat = packageCategories.find((c: any) => c.name === preselectedCategory);
        if (matchedCat) {
          setActivePackageCat(matchedCat.id);
        }
      } else {
        setActiveTab('services');
        setSearchQuery(preselectedCategory); 
        setSelectedCategory('الكل'); 
      }
    }
  }, [preselectedCategory]);

  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);
      const [servicesData, couponsData] = await Promise.all([getServices(), getCoupons()]);
      const formattedServices = servicesData.map((s: any) => ({ 
        ...s, 
        count: 0, 
        features: typeof s.features === 'string' ? JSON.parse(s.features || '[]') : (s.features || []),
        addons: typeof s.addons === 'string' ? JSON.parse(s.addons || '[]') : (s.addons || [])
      }));
      setOurServices(formattedServices);
      setCoupons(couponsData);
      setIsLoading(false);
    };
    loadServices();
  }, []);

  // إصلاح جذري لضمان عمل التوجيه والبحث عن الخدمة بدقة فائقة على الجوال واللابتوب معاً
  useEffect(() => {
    if (targetServiceId && !isLoading && ourServices.length > 0) {
      setActiveTab('services');
      setSearchQuery(''); // مسح أي بحث قديم لضمان ظهور الخدمة المستهدفة
      setSelectedCategory('الكل');

      // البحث عن الخدمة بالاسم المطابق تماماً أو الاحتواء (مع إزالة المسافات الزائدة وحالة الأحرف)
      const cleanTarget = targetServiceId.trim().toLowerCase();
      const targetService = ourServices.find((s: any) => {
        const title = (s.title || '').trim().toLowerCase();
        return title === cleanTarget || title.includes(cleanTarget) || cleanTarget.includes(title);
      });

      if (targetService) {
        // وقت انتظار أطول قليلاً للجوال لضمان اكتمال رسم عناصر الـ DOM بعد تغيير التبويب
        const timer = setTimeout(() => {
          const element = document.getElementById(`service-${targetService.id}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('ring-4', 'ring-amber-500', 'scale-[1.02]');
            setTimeout(() => {
              element.classList.remove('ring-4', 'ring-amber-500', 'scale-[1.02]');
            }, 3000);
          }
          if (onClearTarget) onClearTarget();
        }, 400);

        return () => clearTimeout(timer);
      }
    }
  }, [targetServiceId, isLoading, ourServices, onClearTarget]);

  const handleApplyCoupon = () => {
    const found = coupons.find(c => String(c.Code).trim() === couponCode.trim() && String(c.Active).trim().toUpperCase() === 'TRUE');
    if (found) setAppliedCoupon(found); else { setAppliedCoupon(null); alert('كود الخصم غير صالح أو غير مفعل.'); }
  };

  const updateAddonCount = (serviceId: string, addonTitle: string, delta: number, serviceCount: number) => {
    if (serviceCount === 0) return;
    setSelectedAddons(prev => {
      const serviceAddons = prev[serviceId] || {};
      const newCount = Math.max(0, (serviceAddons[addonTitle] || 0) + delta);
      return { ...prev, [serviceId]: { ...serviceAddons, [addonTitle]: newCount } };
    });
  };

  const getFilteredServices = () => {
    return ourServices.filter(s => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = s.title.toLowerCase().includes(searchLower) || 
                          (s.description && s.description.toLowerCase().includes(searchLower));
      
      if (searchQuery.length > 0) return matchesSearch;
      const cleanSource = selectedCategory.trim().toLowerCase();
      const cleanCat = (s.category || '').trim().toLowerCase();
      const matchesCategory = selectedCategory === 'الكل' || cleanCat === cleanSource;
      
      return matchesCategory;
    });
  };

  const updateCount = (id: number, delta: number) => {
    setOurServices(prev => {
      const nextServices = prev.map(s => {
        if (s.id === id) {
          const newCount = Math.max(0, s.count + delta);
          if (newCount === 0) setSelectedAddons(prev => { const next = { ...prev }; delete next[id]; return next; });
          return { ...s, count: newCount };
        }
        return s;
      });
      if (nextServices.reduce((acc, s) => acc + s.count, 0) === 0) { setAppliedCoupon(null); setCouponCode(''); }
      return nextServices;
    });
  };

  const total = ourServices.reduce((acc: number, s: any) => {
    const basePrice = (Number(s.price) || 0) * (Number(s.count) || 0);
    const addonsPrice = Object.entries(selectedAddons[s.id] || {}).reduce((sum, [title, qty]) => {
      const addon = s.addons.find((a: any) => a.title === title);
      return sum + ((Number(addon?.price) || 0) * (Number(qty) || 0));
    }, 0);
    return acc + basePrice + addonsPrice;
  }, 0);

  const finalTotal = appliedCoupon ? total * (1 - Number(appliedCoupon.DiscountPercentage)) : total;
  const categories = ['الكل', ...Array.from(new Set(ourServices.map(s => s.category || 'أخرى')))];

  const openBooking = (item: any) => { 
    const selectedServicesNames = ourServices
      .filter((s: any) => s.count > 0)
      .map((s: any) => `${s.title} (x${s.count})`)
      .join('، ');

    setSelectedPackage({ 
        ...item, 
        title: selectedServicesNames || item.title, 
        price: finalTotal + ' ر.س',
        sourceProject: item.sourceProject || sourceProject,
        couponCode: appliedCoupon ? appliedCoupon.Code : 'لا يوجد',
        discountAmount: appliedCoupon ? (total - finalTotal).toFixed(2) + ' ر.س' : '0 ر.س'
    }); 
    setIsMobileCartOpen(false); // إغلاق عربة الجوال عند الحجز
    setIsModalOpen(true); 
  };

  const sortedPackageCategories = [...packageCategories].sort((a: any, b: any) => {
    const order = ['إدارة المحتوى', 'المتاجر الإلكترونية', 'المواقع الإلكترونية', 'الهوية البصرية', 'التصوير الشهري'];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  const activeServicesCount = ourServices.reduce((acc: number, s: any) => acc + (s.count > 0 ? 1 : 0), 0);

  return (
    <section className="py-10 md:py-20 px-3 md:px-4 max-w-6xl mx-auto pb-28 md:pb-20">
      <h2 className="text-2xl md:text-4xl font-black text-center mb-3 md:mb-4 text-white">اختر وجهتك الإبداعية</h2>
      <div className="flex items-center justify-center gap-2 text-[11px] text-amber-500/70 mb-8 md:mb-12 text-center">
        <ShieldCheck size={18} className="shrink-0" /> <span>جميع الخدمات آمنة ولا تتطلب دفع مسبق عبر الموقع</span>
      </div>
      
      <div className="flex justify-start md:justify-center gap-2 md:gap-4 mb-8 md:mb-16 overflow-x-auto pb-2 scrollbar-none">
        {['packages', 'solutions', 'services'].map((tab) => (
          <button key={tab} onClick={() => { setActiveTab(tab as any); setSearchQuery(''); setSelectedCategory('الكل'); }} className={`px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all ${activeTab === tab ? 'bg-amber-500 text-black' : 'bg-[#121212] text-white border border-white/5'}`}>
            {tab === 'packages' ? 'الباقات الجاهزة' : tab === 'solutions' ? 'حلول الأعمال' : 'خدماتنا'}
          </button>
        ))}
      </div>

      {activeTab === 'services' && (
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-8 md:mb-12">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3.5 text-white/30" size={18} />
            <input placeholder="ابحث عن خدمة..." onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} className="w-full bg-[#121212] border border-white/10 rounded-xl p-3 pr-10 text-xs md:text-sm text-white outline-none focus:border-amber-500 transition-all" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat: any) => (
              <button key={cat} onClick={() => { setSelectedCategory(cat); setSearchQuery(''); }} className={`px-3.5 md:px-4 py-2.5 md:py-3 rounded-xl text-xs whitespace-nowrap border transition-all ${selectedCategory === cat ? 'bg-amber-500 text-black border-amber-500' : 'bg-[#121212] text-white border-white/5 hover:border-amber-500'}`}>{cat}</button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'solutions' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {businessSolutions.map((sol: any) => (
            <div key={sol.id} className="bg-[#121212] p-5 md:p-8 rounded-3xl border border-white/10 flex flex-col hover:border-amber-500 transition-all justify-between">
              <div>
                <h3 className="text-base md:text-xl font-black mb-2 text-white">{sol.name}</h3>
                <div className="text-xl md:text-3xl font-black text-amber-500 mb-4">{sol.price.toLocaleString()} ر.س</div>
                
                {sol.suitableFor && (
                  <div className="mb-4 bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] text-amber-500 font-bold block mb-1 uppercase tracking-wider">مناسب لـ:</span>
                    <p className="text-white/70 text-xs leading-relaxed">{sol.suitableFor}</p>
                  </div>
                )}

                <div className="mb-5">
                  <span className="text-xs font-bold text-white block mb-2 border-b border-white/10 pb-2">ماذا يشمل؟</span>
                  <ul className="text-white/70 text-xs space-y-2 flex-grow">
                    {sol.features.map((f: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 leading-relaxed">
                        <CheckCircle size={14} className="text-amber-500 shrink-0 mt-0.5" /> 
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {sol.duration && (
                  <div className="mb-5 pt-3 border-t border-white/5 flex justify-between items-center text-xs">
                    <span className="text-white/40">مدة التنفيذ:</span>
                    <span className="font-bold text-amber-500">{sol.duration}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <button onClick={() => openBooking({ title: sol.name, price: sol.price.toLocaleString() + ' ر.س' })} className="w-full bg-white text-black py-3 rounded-xl font-black hover:bg-amber-500 transition-all shadow-md text-xs md:text-sm">
                  طلب هذا الحل
                </button>
                {onOrderSimilar && (
                  <button onClick={() => onOrderSimilar(sol.name)} className="w-full bg-white/5 text-amber-500 py-2.5 rounded-xl font-bold hover:bg-white/10 transition-all text-xs flex items-center justify-center gap-1.5 border border-white/5">
                    <Eye size={14} /> استعرض أعمال هذا الحل
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : activeTab === 'packages' ? (
        <>
          <div className="flex justify-start md:justify-center gap-2 mb-8 md:mb-12 overflow-x-auto pb-2 scrollbar-none">
            {sortedPackageCategories.map((cat: any) => (
              <button key={cat.id} onClick={() => setActivePackageCat(cat.id)} className={`px-4 py-2 md:px-5 md:py-2 rounded-lg text-xs md:text-sm font-bold whitespace-nowrap transition-all ${activePackageCat === cat.id ? 'bg-white text-black' : 'bg-[#121212] text-white border border-white/10'}`}>
                {cat.name}
              </button>
            ))}
          </div>
          <div className="text-center mb-8 md:mb-10">
              <button 
                onClick={() => {
                  const currentCategory = sortedPackageCategories.find((c: any) => c.id === activePackageCat);
                  if (currentCategory && currentCategory.bundleKey) {
                    setActiveBundleType(currentCategory.bundleKey as keyof typeof BUNDLE_CATEGORIES);
                  }
                }}
                className="text-amber-500 text-xs md:text-sm font-bold border border-amber-500/30 px-5 md:px-6 py-2.5 rounded-full hover:bg-amber-500 hover:text-black transition-all inline-flex items-center gap-2"
              >
                <LayoutDashboard size={16} /> صمم باقتك الخاصة لهذا القسم
              </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {sortedPackageCategories.find((c: any) => c.id === activePackageCat)?.packages.map((pkg: any) => {
              const currentCatName = sortedPackageCategories.find((c: any) => c.id === activePackageCat)?.name;
              return (
                <div key={pkg.id} className="bg-[#121212] p-5 md:p-8 rounded-3xl border border-white/5 flex flex-col hover:border-amber-500 transition-all justify-between">
                  <div>
                    <h3 className="text-base md:text-xl font-bold mb-2">{pkg.name}</h3>
                    <div className="text-lg md:text-2xl font-black text-amber-500 mb-4 md:mb-6">{pkg.price.toLocaleString()} ر.س</div>
                    <ul className="text-white/60 text-xs md:text-sm mb-6 md:mb-8 space-y-2 flex-grow">
                      {pkg.features.map((f: any, i: any) => <li key={i} className="flex items-center gap-2"> <CheckCircle size={14} className="text-amber-500 shrink-0" /> {f}</li>)}
                    </ul>
                  </div>
                  <div className="space-y-2.5">
                    <button onClick={() => openBooking(pkg)} className="w-full bg-white text-black py-3 rounded-xl font-bold text-xs md:text-sm hover:bg-amber-500 transition-all">حجز الباقة فوراً</button>
                    {onOrderSimilar && currentCatName && (
                      <button onClick={() => onOrderSimilar(currentCatName)} className="w-full bg-white/5 text-amber-500 py-2.5 rounded-xl font-bold hover:bg-white/10 transition-all text-xs flex items-center justify-center gap-1.5 border border-white/5">
                        <Eye size={14} /> استعرض أعمال هذا القسم
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : isLoading ? (
        <Loader text="جاري تحميل الخدمات الإبداعية..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-start relative">
          <div className="md:col-span-2 grid grid-cols-2 gap-3 md:gap-6">
            {getFilteredServices().map((s: any) => (
              <div id={`service-${s.id}`} key={s.id} className="bg-[#121212] p-3.5 sm:p-5 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 hover:border-amber-500 transition-all flex flex-col justify-between w-full">
                <div className="w-full">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-1 sm:gap-4 mb-2 md:mb-4 w-full">
                    <h4 className="font-black text-xs sm:text-sm md:text-xl text-white leading-snug w-full">{s.title}</h4>
                    <span className="text-amber-500 font-black text-xs sm:text-base md:text-2xl whitespace-nowrap">{s.price} ر.س</span>
                  </div>
                  <p className="text-white/50 text-[10px] sm:text-xs md:text-sm mb-3 leading-relaxed w-full">{s.description}</p>
                  <div className="border-t border-white/10 my-2 md:my-3 w-full"></div>
                  {onOrderSimilar && (
                    <button onClick={() => onOrderSimilar(s.category)} className="text-[9px] sm:text-[11px] text-amber-500 font-bold mb-3 hover:underline text-right block truncate w-full">استعرض أعمال هذه الخدمة</button>
                  )}
                  <div className="flex flex-wrap content-start gap-1.5 md:gap-2 mb-4 md:mb-8 flex-grow w-full">
                    {(s.features || []).map((f: string, i: number) => (
                      <span key={i} className="bg-white/5 px-2 py-0.5 md:py-1 rounded text-[9px] md:text-[11px] text-white/70 flex items-center gap-1 w-fit"><CheckCircle size={10} className="text-amber-500 shrink-0" /> {f}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-3 md:pt-5 border-t border-white/5 w-full">
                  {(s.addons || []).map((a: any) => (
                    <div key={a.id} className="flex items-center justify-between w-full mb-2 gap-1.5">
                        <span className={`text-[10px] sm:text-xs flex-1 text-right truncate ${s.count > 0 ? 'text-white/70' : 'text-white/25'}`} title={a.title}>{a.title}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                            <button onClick={() => updateAddonCount(s.id, a.title, -1, s.count)} disabled={s.count === 0} className="text-white/50 hover:text-white disabled:opacity-20"><MinusCircle size={14}/></button>
                            <span className="text-[10px] sm:text-xs font-bold w-3 text-center">{selectedAddons[s.id]?.[a.title] || 0}</span>
                            <button onClick={() => updateAddonCount(s.id, a.title, 1, s.count)} disabled={s.count === 0} className="text-amber-500 hover:border-amber-400 disabled:opacity-20"><PlusCircle size={14}/></button>
                        </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between mt-3 w-full">
                    <button onClick={() => updateCount(s.id, -1)} className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white/5 rounded-lg md:rounded-xl hover:bg-white/10 text-white text-xs md:text-base">-</button>
                    <span className="font-bold text-xs sm:text-sm md:text-lg w-6 text-center text-white">{s.count}</span>
                    <button onClick={() => updateCount(s.id, 1)} className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-amber-500 text-black rounded-lg md:rounded-xl hover:bg-amber-400 text-xs md:text-base">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="hidden md:block bg-[#121212] p-6 md:p-8 rounded-3xl md:sticky md:top-24 border border-white/5 shadow-xl">
            <h3 className="text-lg md:text-xl font-bold mb-4 text-white">ملخص السلة</h3>
            {ourServices.filter((s: any) => s.count > 0).length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-center text-white/30">
                    <Sparkles size={32} className="mb-3 text-amber-500/50" />
                    <p className="text-xs md:text-sm">سلتك فارغة.. ابدأ الآن في بناء مشروعك الاستثنائي معنا</p>
                </div>
            ) : (
                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                    {ourServices.filter((s: any) => s.count > 0).map((s: any) => (
                        <div key={s.id} className="space-y-1 mb-2">
                            <div className="flex justify-between text-xs bg-black p-3 rounded-lg border border-white/5 text-white">
                                <span>{s.title}</span><span className="text-amber-500 font-bold">{Number(s.price) * s.count} ر.س</span>
                            </div>
                            {Object.entries(selectedAddons[s.id] || {}).map(([title, qty], i) => {
                                if (qty === 0) return null;
                                const addon = s.addons.find((a: any) => a.title === title);
                                return (
                                    <div key={i} className="flex justify-between text-[10px] pl-4 text-white/50">
                                        <span>{title} (x{qty})</span><span>{(Number(addon?.price) || 0) * qty} ر.س</span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            )}
            <div className="mb-6">
                <div className="flex gap-2 mb-2">
                    <input type="text" placeholder="كود الخصم" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="flex-grow bg-black border border-white/10 rounded-lg p-2 text-xs outline-none text-white" />
                    <button onClick={handleApplyCoupon} className="bg-white/10 px-3 py-2 rounded-lg text-xs hover:bg-white/20 text-white"><Tag size={14} /></button>
                </div>
                {appliedCoupon && <p className="text-[10px] text-green-500">تم تطبيق خصم {Number(appliedCoupon.DiscountPercentage) * 100}% بنجاح</p>}
            </div>
            <div className="text-lg md:text-xl font-black text-white mb-6 border-t border-white/5 pt-4">
              المجموع: <span className="text-amber-500">{finalTotal} ر.س</span>
              {appliedCoupon && <span className="text-xs text-white/30 line-through mr-2">{total} ر.س</span>}
            </div>
            <button disabled={total === 0} onClick={() => openBooking({})} className="w-full bg-white text-black py-3.5 md:py-4 rounded-xl font-black text-sm hover:bg-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all disabled:opacity-30 disabled:shadow-none">
              المتابعة للحجز والطلب
            </button>
            <p className="text-[10px] text-white/20 mt-4 text-center">الأسعار لا تشمل ضريبة القيمة المضافة</p>
          </div>
        </div>
      )}

      {activeServicesCount > 0 && (
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 bg-[#1a1a1a]/95 backdrop-blur-md border border-amber-500/30 rounded-2xl p-4 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center font-black text-sm">
              {activeServicesCount}
            </div>
            <div>
              <p className="text-[10px] text-white/50">إجمالي السلة</p>
              <p className="text-sm font-black text-amber-500">{finalTotal} ر.س</p>
            </div>
          </div>
          <button 
            onClick={() => setIsMobileCartOpen(true)}
            className="bg-white text-black px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 shadow-md"
          >
            <ShoppingCart size={16} /> عرض السلة والحجز
          </button>
        </div>
      )}

      {isMobileCartOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center" onClick={() => setIsMobileCartOpen(false)}>
          <div className="bg-[#121212] w-full max-h-[85vh] rounded-t-3xl border-t border-white/10 p-6 overflow-y-auto flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShoppingCart size={18} className="text-amber-500" /> ملخص السلة
              </h3>
              <button onClick={() => setIsMobileCartOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 mb-6 max-h-52 overflow-y-auto">
              {ourServices.filter((s: any) => s.count > 0).map((s: any) => (
                <div key={s.id} className="space-y-1 mb-2">
                  <div className="flex justify-between text-xs bg-black p-3 rounded-lg border border-white/5 text-white">
                    <span>{s.title} (x{s.count})</span><span className="text-amber-500 font-bold">{Number(s.price) * s.count} ر.س</span>
                  </div>
                  {Object.entries(selectedAddons[s.id] || {}).map(([title, qty], i) => {
                    if (qty === 0) return null;
                    const addon = s.addons.find((a: any) => a.title === title);
                    return (
                      <div key={i} className="flex justify-between text-[10px] pl-4 text-white/50">
                        <span>{title} (x{qty})</span><span>{(Number(addon?.price) || 0) * qty} ر.س</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="mb-4">
              <div className="flex gap-2 mb-2">
                <input type="text" placeholder="كود الخصم" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="flex-grow bg-black border border-white/10 rounded-lg p-2.5 text-xs outline-none text-white" />
                <button onClick={handleApplyCoupon} className="bg-white/10 px-4 py-2.5 rounded-xl text-xs hover:bg-white/20 text-white"><Tag size={14} /></button>
              </div>
              {appliedCoupon && <p className="text-[10px] text-green-500">تم تطبيق خصم {Number(appliedCoupon.DiscountPercentage) * 100}% بنجاح</p>}
            </div>

            <div className="text-lg font-weight-bold text-white mb-6 border-t border-white/5 pt-4 flex justify-between items-center">
              <span>المجموع الكلي:</span>
              <span className="text-amber-500">{finalTotal} ر.س</span>
            </div>

            <button disabled={total === 0} onClick={() => openBooking({})} className="w-full bg-white text-black py-4 rounded-xl font-black text-sm hover:bg-amber-500 transition-all shadow-lg">
              المتابعة للحجز والطلب
            </button>
          </div>
        </div>
      )}

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedPackage={selectedPackage} customServices={ourServices} selectedAddons={selectedAddons} />
      {activeBundleType && (
        <CustomBundleBuilder 
          isOpen={activeBundleType !== null} 
          onClose={() => setActiveBundleType(null)} 
          categoryType={activeBundleType} 
        />
      )}
    </section>
  );
}