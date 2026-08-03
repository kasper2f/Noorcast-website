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

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [preselectedCategory, setPreselectedCategory] = useState<string | undefined>(undefined);
  const [selectedProject, setSelectedProject] = useState<any>(null); 
  const [sourceProject, setSourceProject] = useState<any>(null); 
  
  const [pendingServiceId, setPendingServiceId] = useState<string | null>(null);

  // دعم الروابط المباشرة عبر الـ Hash (مثل #store أو #portfolio) وقراءة الخدمات المباشرة
  useEffect(() => {
    const handleHashRoute = () => {
      const hash = window.location.hash;
      
      if (hash.startsWith('#service-')) {
        const id = hash.replace('#service-', '');
        setPendingServiceId(id);
        setActiveTab('store');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const cleanHash = hash.replace('#', '').trim();
      const validTabs = ['home', 'portfolio', 'magazine', 'store', 'tracker', 'partners', 'admin'];
      
      if (validTabs.includes(cleanHash)) {
        setActiveTab(cleanHash);
        setSelectedProject(null);
      }
    };
    
    window.addEventListener('hashchange', handleHashRoute);
    handleHashRoute();
    return () => window.removeEventListener('hashchange', handleHashRoute);
  }, []);

  // التمرير التلقائي لأعلى الصفحة فوراً عند تغيير أي تبويب أو مشروع
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, selectedProject]);

  // دالة لتغيير التبويب وتحديث مسار الـ Hash في المتصفح ليطابق الرابط المباشر
  const changeTabAndRoute = (tab: string) => {
    setActiveTab(tab);
    setSelectedProject(null);
    if (tab !== 'store') {
      setPreselectedCategory(undefined);
      setSourceProject(null);
      setPendingServiceId(null);
    }
    window.location.hash = tab === 'home' ? '' : tab;
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
    
    if (packageCategoriesList.includes(categoryName)) {
      setPreselectedCategory(categoryName);
    } else {
      setPreselectedCategory(categoryName);
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
    changeTabAndRoute('store');
  };

  const handleViewSimilarPortfolio = (category: string) => {
    const cleanCategory = (category || '').trim().toLowerCase();
    const magazineKeywords = ['صور', 'تصوير', 'فوتو', 'جرافيك', 'هوية', 'تصميم', 'إيف ستايل', 'لايف ستايل', 'منتجات'];
    const isMagazineTarget = magazineKeywords.some(keyword => cleanCategory.includes(keyword));

    setPreselectedCategory(category);
    
    if (isMagazineTarget) {
      changeTabAndRoute('magazine');
    } else {
      changeTabAndRoute('portfolio');
    }

    setSelectedProject(null);
  };

  const handleServiceClick = (serviceName: string) => {
    setPendingServiceId(serviceName);
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