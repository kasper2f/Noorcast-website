import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import Workflow from './components/Workflow';
import Portfolio from './components/Portfolio';
import PortfolioPreview from './components/PortfolioPreview';
import Store from './components/Store';
import MagazineGallery from './components/MagazineGallery';
import Partners from './components/Partners';
import OrderTracker from './components/OrderTracker';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import ProjectDetailsPage from './components/ProjectDetailsPage'; 
import ChatWidget from './components/ChatWidget';
import { getServices, getPortfolio, getMagazine } from './dbService';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [preselectedCategory, setPreselectedCategory] = useState<string | undefined>(undefined);
  const [defaultStoreTab, setDefaultStoreTab] = useState<'packages' | 'services' | 'solutions'>('packages');
  const [selectedProject, setSelectedProject] = useState<any>(null); 
  const [sourceProject, setSourceProject] = useState<any>(null); 
  
  const [pendingServiceId, setPendingServiceId] = useState<string | null>(null);

  useEffect(() => {
    getServices().catch(() => {});
    getPortfolio().catch(() => {});
    getMagazine().catch(() => {}); 
  }, []);

  useEffect(() => {
    const handleHashRoute = () => {
      // 💡 التحديث هنا: فك تشفير الرابط لدعم اللغة العربية
      const hash = decodeURIComponent(window.location.hash);
      
      if (hash.startsWith('#service-')) {
        const id = hash.replace('#service-', '');
        setPendingServiceId(id);
        setDefaultStoreTab('services');
        setActiveTab('store');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 💡 التحديث هنا: دعم رابط الفلتر المباشر
      if (hash.startsWith('#store-filter-')) {
        const categoryName = hash.replace('#store-filter-', '').trim();
        setPreselectedCategory(categoryName);
        setDefaultStoreTab('services');
        setActiveTab('store');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const cleanHash = hash.replace('#', '').trim();
      const validTabs = ['home', 'portfolio', 'magazine', 'store', 'tracker', 'partners', 'admin', 'store-services'];
      
      if (validTabs.includes(cleanHash)) {
        if (cleanHash === 'store-services') {
          setActiveTab('store');
          setDefaultStoreTab('services');
          // أبقينا هذا السطر كما كان في كودك
          setPreselectedCategory(undefined);
        } else {
          setActiveTab(cleanHash);
          if (cleanHash === 'store') setDefaultStoreTab('packages');
        }
        setSelectedProject(null);
      }
    };
    
    window.addEventListener('hashchange', handleHashRoute);
    handleHashRoute();
    return () => window.removeEventListener('hashchange', handleHashRoute);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, selectedProject]);

  const changeTabAndRoute = (tab: string) => {
    setSelectedProject(null);
    if (tab === 'store-services') {
      setActiveTab('store');
      setDefaultStoreTab('services');
      setPreselectedCategory(undefined);
      setSourceProject(null);
      setPendingServiceId(null);
      window.location.hash = 'store-services';
    } else {
      setActiveTab(tab);
      if (tab === 'store') {
        setDefaultStoreTab('packages');
      }
      if (tab !== 'store') {
        // هذه هي الدالة التي كانت تمسح الفلتر كما طلبت الحفاظ عليها
        setPreselectedCategory(undefined);
        setSourceProject(null);
        setPendingServiceId(null);
      }
      window.location.hash = tab === 'home' ? '' : tab;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSimilar = (project: any) => {
    const projectSource = project.sourceProject || {
        title: project.title,
        freelancerName: project.freelancerName,
        imageUrl: project.mediaUrl || project.imageUrl
    };
    setSourceProject(projectSource); 
    
    const categoryName = project.subCategory || project.category || '';
    const packageCategoriesList = ['إدارة المحتوى', 'المتاجر الإلكترونية', 'المواقع الإلكترونية', 'الهوية البصرية', 'التصوير الشهري'];
    
    if (categoryName === 'الباقات الجاهزة' || packageCategoriesList.includes(categoryName)) {
      setPreselectedCategory(categoryName === 'الباقات الجاهزة' ? undefined : categoryName); 
      setDefaultStoreTab('packages'); 
      setPendingServiceId(null);
    } else {
      setPreselectedCategory(categoryName);
      setDefaultStoreTab('services'); 
      setPendingServiceId(categoryName); 
    }

    changeTabAndRoute('store');
    setSelectedProject(null); 
  };

  const handleMagazineOrder = (item: any) => {
    setSourceProject({
        title: item.title,
        freelancerName: item.freelancerName,
        imageUrl: item.imageUrl
    });
    const targetCategory = item.subCategory || item.category;
    setPreselectedCategory(targetCategory);
    setDefaultStoreTab('packages');
    changeTabAndRoute('store');
  };

  // 💡 هذه الدالة المحدثة سابقاً التي تفصل التنقل عن مسح الفلتر
  const handleViewSimilarPortfolio = (category: string) => {
    const cleanCategory = (category || '').trim().toLowerCase();
    const magazineKeywords = ['صور', 'تصوير', 'فوتو', 'جرافيك', 'هوية', 'تصميم', 'إيف ستايل', 'لايف ستايل', 'منتجات'];
    const isMagazineTarget = magazineKeywords.some(keyword => cleanCategory.includes(keyword));

    // نحفظ الفلتر (مثلاً: إدارة المحتوى)
    setPreselectedCategory(category);
    
    // نغير التبويب والمسار يدوياً بدون مسح الفلتر
    const targetTab = isMagazineTarget ? 'magazine' : 'portfolio';
    setActiveTab(targetTab);
    window.location.hash = targetTab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedProject(null);
  };

  const handleServiceClick = (serviceName: string) => {
    setPendingServiceId(serviceName);
    setDefaultStoreTab('services');
    changeTabAndRoute('store');
    setSelectedProject(null);
  };

  const handleOrderSuccess = (orderId: string) => {
    setPreselectedCategory(undefined);
    setSourceProject(null); 
    changeTabAndRoute('tracker');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F8FAFC] font-sans selection:bg-amber-500 selection:text-black flex flex-col relative" dir="rtl">
      <Header 
        activeTab={activeTab} 
        setActiveTab={changeTabAndRoute} 
        isAdmin={isAdmin} 
        setIsAdmin={setIsAdmin} 
      />

      <main className="flex-grow w-full relative">
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <motion.div key="details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProjectDetailsPage 
                project={selectedProject} 
                onBack={() => {
                  setSelectedProject(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                onOrderSimilar={handleOrderSimilar}
                onServiceClick={handleServiceClick}
              />
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {activeTab === 'home' && (
                <div className="space-y-0 pb-16">
                  <Hero setActiveTab={changeTabAndRoute} />
                  <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}><WhyUs /></motion.div>
                  <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}><Workflow /></motion.div>

                  <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                    <PortfolioPreview 
                        onOrderSimilar={handleOrderSimilar} 
                        setActiveTab={changeTabAndRoute} 
                        setSelectedProject={setSelectedProject} 
                    />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}><Partners /></motion.div>
                </div>
              )}
              
              {activeTab === 'portfolio' && (
                <Portfolio 
                  isAdmin={isAdmin}
                  onOrderSimilar={handleOrderSimilar} 
                  setSelectedProject={setSelectedProject} 
                  filterCategory={preselectedCategory} 
                />
              )}
              
              {activeTab === 'magazine' && <MagazineGallery setActiveTab={handleMagazineOrder} initialCategory={preselectedCategory} />}
              
              {activeTab === 'store' && (
                <Store 
                  preselectedCategory={preselectedCategory} 
                  onOrderSuccess={handleOrderSuccess}
                  onOrderSimilar={handleViewSimilarPortfolio} 
                  sourceProject={sourceProject}
                  targetServiceId={pendingServiceId}
                  onClearTarget={() => setPendingServiceId(null)}
                  setActiveTab={changeTabAndRoute}
                  defaultTab={defaultStoreTab}
                />
              )}
              
              {activeTab === 'tracker' && <OrderTracker />}
              {activeTab === 'admin' && <AdminDashboard />}
              {activeTab === 'partners' && <Partners />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ChatWidget />
      <Footer setActiveTab={changeTabAndRoute} />
    </div>
  );
}