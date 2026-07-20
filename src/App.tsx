import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
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

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#service-')) {
        const id = hash.replace('#service-', '');
        setPendingServiceId(id);
        setActiveTab('store');
        window.history.replaceState(null, '', window.location.pathname);
      }
    };
    
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOrderSimilar = (project: any) => {
    const projectSource = project.sourceProject || {
        title: project.title,
        freelancerName: project.freelancerName,
        imageUrl: project.mediaUrl || project.imageUrl
    };
    setSourceProject(projectSource); 
    setPreselectedCategory(project.subCategory || project.category);
    setActiveTab('store');
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
    setActiveTab('store');
  };

  const handleViewSimilarPortfolio = (category: string) => {
    setPreselectedCategory(category);
    setActiveTab('portfolio');
    setSelectedProject(null);
  };

  const handleOrderSuccess = (orderId: string) => {
    setPreselectedCategory(undefined);
    setSourceProject(null); 
    setActiveTab('tracker');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F8FAFC] font-sans selection:bg-amber-500 selection:text-black flex flex-col relative" dir="rtl">
      <Header 
        activeTab={activeTab} 
        setActiveTab={(tab: string) => {
          setActiveTab(tab);
          setSelectedProject(null); 
          if (tab !== 'store') {
            setPreselectedCategory(undefined);
            setSourceProject(null);
            setPendingServiceId(null);
          }
        }} 
        isAdmin={isAdmin} 
        setIsAdmin={setIsAdmin} 
      />

      <main className="flex-grow w-full relative">
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <motion.div key="details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProjectDetailsPage 
                project={selectedProject} 
                onBack={() => setSelectedProject(null)} 
                onOrderSimilar={handleOrderSimilar}
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
                  <Hero setActiveTab={setActiveTab} />
                  <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}><WhyUs /></motion.div>
                  <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                    <PortfolioPreview 
                        onOrderSimilar={handleOrderSimilar} 
                        setActiveTab={setActiveTab} 
                        setSelectedProject={setSelectedProject} 
                    />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}><Partners /></motion.div>
                </div>
              )}
              
              {activeTab === 'portfolio' && (
                <Portfolio 
                  onOrderSimilar={handleOrderSimilar} 
                  setSelectedProject={setSelectedProject} 
                  filterCategory={preselectedCategory} 
                />
              )}
              
              {activeTab === 'magazine' && <MagazineGallery setActiveTab={handleMagazineOrder} />}
              
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
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}