import React, { useEffect, useState, useMemo, useRef } from 'react';
import { getOrders, updateOrderStatus, getServices, addService, deleteService, updateService } from '../dbService';
import { RefreshCw, MessageCircle, ShieldAlert, Plus, Trash2, Edit2, Search, Send, Menu, X } from 'lucide-react';
import { listenToChat, sendMessage } from '../services/chatService';
import { ref, getDatabase, onValue, remove } from 'firebase/database';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'services' | 'chats'>('orders');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceSearch, setServiceSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('الكل');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [newService, setNewService] = useState({ title: '', price: '', description: '', category: '', features: '', addons: '' });
  const [editingService, setEditingService] = useState<any>(null);

  const [chatUsers, setChatUsers] = useState<string[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [replyText, setReplyText] = useState('');
  const [showMobileChatList, setShowMobileChatList] = useState(true); // تبديل القائمة/المحادثة في الجوال

  // مرجع للنزول لآخر رسالة في المحادثة التلقائي
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const filteredServicesForChat = useMemo(() => {
    return services.filter((s: any) => s.title.toLowerCase().includes(serviceSearch.toLowerCase()));
  }, [services, serviceSearch]);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
      const db = getDatabase();
      const chatsRef = ref(db, 'chats');
      return onValue(chatsRef, (snapshot) => {
        if (snapshot.exists()) {
          setChatUsers(Object.keys(snapshot.val()));
        } else {
          setChatUsers([]);
        }
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (activeChat) {
      return listenToChat(activeChat, (data) => {
        setChatMessages(data ? Object.values(data) : []);
      });
    }
  }, [activeChat]);

  // عمل Scroll تلقائي عند فتح الشات أو استلام رسالة جديدة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, activeChat]);

  const handleDeleteChat = async (chatId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه المحادثة نهائياً؟')) {
      const db = getDatabase();
      await remove(ref(db, 'chats/' + chatId));
      setActiveChat(null);
    }
  };

  const insertServiceLink = (service: any) => {
    const link = `noorcast://service/${service.id}`;
    setReplyText((prev) => prev + (prev ? ' ' : '') + link);
    setServiceSearch('');
  };

  const loadData = async () => {
    setLoading(true);
    const ordersData = await getOrders();
    setOrders(ordersData || []);
    const servicesData = await getServices(); 
    setServices(servicesData || []);
    setLoading(false);
  };

  const handleReply = () => {
    if (activeChat && replyText) {
      sendMessage(activeChat, replyText, 'admin');
      setReplyText('');
    }
  };

  const getFilteredOrders = () => {
    return orders.filter((o: any) => {
      const matchesSearch = o.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) || o.orderId?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'الكل' || o.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  };

  const getFilteredServices = () => {
    return services.filter((s: any) => {
      const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === 'الكل' || s.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    await updateOrderStatus(orderId, newStatus);
    loadData();
  };

  const handleAddService = async () => {
    if (!newService.title || !newService.price) return alert('يرجى تعبئة العنوان والسعر');
    const formattedService = {
      ...newService,
      features: newService.features.split(',').map(f => f.trim()),
      addons: newService.addons ? newService.addons.split(';').filter((i: string) => i.includes(':')).map(item => ({
          id: Date.now().toString() + Math.random(),
          title: item.split(':')[0].trim(),
          price: Number(item.split(':')[1] || 0)
      })) : []
    };
    await addService(formattedService);
    setNewService({ title: '', price: '', description: '', category: '', features: '', addons: '' });
    loadData();
  };

  const handleDeleteService = async (serviceId: string) => {
    await deleteService(serviceId);
    loadData();
  };

  const handleUpdateService = async () => {
    const updated = {
        ...editingService,
        features: typeof editingService.features === 'string' ? editingService.features.split(',').map((f: string) => f.trim()) : editingService.features,
        addons: typeof editingService.addons === 'string' ? editingService.addons.split(';').filter((i: string) => i.includes(':')).map((item: string) => ({
            id: Date.now().toString() + Math.random(),
            title: item.split(':')[0].trim(),
            price: Number(item.split(':')[1] || 0)
        })) : editingService.addons
    };
    await updateService(updated);
    setEditingService(null);
    loadData();
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white p-4">
        <div className="bg-[#121212] p-6 md:p-8 rounded-3xl border border-white/5 shadow-[0_0_30px_rgba(245,158,11,0.1)] w-full max-w-md">
          <div className="text-center mb-6 md:mb-8">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
              <ShieldAlert className="text-amber-500" size={28} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-2">بوابة إدارة نوركاست</h2>
            <p className="text-amber-500/80 text-[11px] md:text-xs mt-2 px-2 italic border-t border-white/5 pt-4">تنبيه: جميع محاولات الدخول غير المصرح بها يتم تسجيلها ومراقبتها.</p>
          </div>
          <div className="space-y-3.5 md:space-y-4">
            <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm outline-none focus:border-amber-500 text-white" />
            <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm outline-none focus:border-amber-500 text-white" />
            <button 
              onClick={() => { 
                if (email === 'nc' && password === '1234') setIsAuthenticated(true); 
                else alert('بيانات الدخول غير صحيحة، يرجى المحاولة مرة أخرى.'); 
              }} 
              className="w-full bg-amber-500 text-black py-3 rounded-xl font-bold text-xs md:text-sm shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all"
            >
              تسجيل الدخول
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-3 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4 border-b border-white/10 pb-4">
        <div className="flex gap-2 sm:gap-4 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
          <button onClick={() => setActiveTab('orders')} className={`text-base md:text-xl font-black whitespace-nowrap transition-colors ${activeTab === 'orders' ? 'text-amber-500' : 'text-white/40 hover:text-white'}`}>إدارة الطلبات</button>
          <button onClick={() => setActiveTab('services')} className={`text-base md:text-xl font-black whitespace-nowrap transition-colors ${activeTab === 'services' ? 'text-amber-500' : 'text-white/40 hover:text-white'}`}>إدارة الخدمات</button>
          <button onClick={() => setActiveTab('chats')} className={`text-base md:text-xl font-black whitespace-nowrap transition-colors ${activeTab === 'chats' ? 'text-amber-500' : 'text-white/40 hover:text-white'}`}>المحادثات</button>
        </div>
        <button onClick={loadData} className={`text-amber-500/70 hover:text-amber-500 transition-all self-end sm:self-auto ${loading ? 'animate-spin' : ''}`}><RefreshCw size={22} /></button>
      </div>

      {activeTab === 'chats' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[75vh] md:h-[600px] mb-8 relative">
          {/* قائمة المستخدمين (تظهر دائماً في اللابتوب وفي الجوال عند عدم اختيار محادثة) */}
          <div className={`bg-[#121212] rounded-2xl p-3 md:p-4 border border-white/5 overflow-y-auto ${!showMobileChatList && activeChat ? 'hidden md:block' : 'block'}`}>
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3 px-2">المحادثات النشطة ({chatUsers.length})</h3>
            {chatUsers.length === 0 ? (
              <p className="text-xs text-white/30 text-center py-8">لا توجد محادثات نشطة حالياً</p>
            ) : (
              chatUsers.map(user => (
                <div key={user} className={`p-3 rounded-xl mb-2 flex justify-between items-center transition-all ${activeChat === user ? 'bg-amber-500/20 border border-amber-500/30' : 'hover:bg-white/5'}`}>
                  <span className="cursor-pointer flex-1 text-xs md:text-sm font-bold truncate text-white" onClick={() => { setActiveChat(user); setShowMobileChatList(false); }}>{user}</span>
                  <button onClick={() => handleDeleteChat(user)} className="text-red-500 hover:text-red-400 p-1 shrink-0">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* نافذة المحادثة والرد */}
          <div className={`md:col-span-2 bg-[#121212] rounded-2xl flex flex-col border border-white/5 overflow-hidden ${showMobileChatList && !activeChat ? 'hidden md:flex' : 'flex'}`}>
            {activeChat ? (
              <>
                {/* رأس الشات للجوال للعودة للقائمة */}
                <div className="md:hidden bg-black/50 p-3 border-b border-white/10 flex items-center justify-between">
                  <button onClick={() => setShowMobileChatList(true)} className="text-xs text-amber-500 font-bold flex items-center gap-1">
                    ← العودة للقائمة
                  </button>
                  <span className="text-xs text-white/70 font-mono truncate max-w-[200px]">{activeChat}</span>
                </div>

                {/* منطقة الرسائل قابلة للتمرير الداخلي (Scroll) */}
                <div className="flex-1 p-3 md:p-4 overflow-y-auto space-y-2.5">
                  {chatMessages.map((m, i) => (
                    <div key={i} className={`p-3 rounded-xl max-w-[85%] md:max-w-[70%] w-fit text-xs md:text-sm leading-relaxed ${m.sender === 'admin' ? 'bg-amber-500 text-black ml-auto font-medium' : 'bg-white/10 text-white mr-auto'}`}>
                      {m.text}
                    </div>
                  ))}
                  {/* نقطة النزول التلقائي للمحادثة */}
                  <div ref={messagesEndRef} />
                </div>

                {/* منطقة الإدخال ثابتة في الأسفل */}
                <div className="p-3 md:p-4 border-t border-white/5 space-y-2 shrink-0 bg-[#121212]">
                  <div className="relative">
                    <input 
                      placeholder="ابحث عن خدمة لإدراجها..." 
                      value={serviceSearch} 
                      onChange={(e) => setServiceSearch(e.target.value)}
                      className="w-full bg-black text-white text-[11px] md:text-xs p-2.5 rounded-xl border border-white/10 outline-none focus:border-amber-500"
                    />
                    {serviceSearch && (
                      <div className="absolute bottom-full mb-1 z-10 w-full bg-[#1A1A1A] border border-white/10 rounded-xl max-h-40 overflow-y-auto shadow-xl">
                        {filteredServicesForChat.map((s: any) => (
                          <div key={s.id} onClick={() => insertServiceLink(s)} className="p-2.5 text-xs text-white hover:bg-amber-500/20 cursor-pointer border-b border-white/5 last:border-0 flex justify-between items-center">
                            <span>{s.title}</span>
                            <span className="text-amber-500 text-[10px]">{s.price} SAR</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      value={replyText} 
                      onChange={(e) => setReplyText(e.target.value)} 
                      onKeyPress={(e) => e.key === 'Enter' && handleReply()}
                      className="flex-1 bg-black p-2.5 rounded-xl text-xs md:text-sm text-white outline-none border border-white/5 focus:border-amber-500" 
                      placeholder="رد على العميل..." 
                    />
                    <button onClick={handleReply} className="bg-amber-500 text-black px-4 py-2 rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center shrink-0"><Send size={18} /></button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-white/30 p-6 text-center">
                <MessageCircle size={40} className="mb-2 text-white/10" />
                <p className="text-xs md:text-sm">اختر محادثة من القائمة للبدء في الرد على العميل</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-3 mb-6 md:mb-8 bg-[#121212] p-4 rounded-2xl border border-white/5">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-3 text-white/30" size={18} />
              <input placeholder="بحث..." onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl py-2.5 pr-10 pl-4 text-xs md:text-sm text-white focus:border-amber-500 outline-none" />
            </div>
            {activeTab === 'orders' ? (
              <select onChange={(e) => setSelectedStatus(e.target.value)} className="bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white outline-none focus:border-amber-500">
                <option value="الكل">كل الحالات</option>
                <option value="جديد">جديد</option>
                <option value="قيد المراجعة">قيد المراجعة</option>
                <option value="تم التنفيذ">تم التنفيذ</option>
              </select>
            ) : (
              <select onChange={(e) => setSelectedCategory(e.target.value)} className="bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white outline-none focus:border-amber-500">
                <option value="الكل">كل الأصناف</option>
                {Array.from(new Set(services.map((s:any) => s.category))).map((cat:any) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            )}
          </div>

          {activeTab === 'orders' ? (
            <div className="space-y-4 md:space-y-0">
              {/* عرض جدول على اللابتوب وعرض كروت متجاوبة على الجوال */}
              <div className="hidden md:block bg-[#121212] rounded-3xl border border-white/5 overflow-hidden">
                <table className="w-full text-right">
                  <thead className="bg-black/40 text-xs text-white/30 uppercase tracking-widest">
                    <tr>
                      <th className="p-6">رقم الطلب</th>
                      <th className="p-6">العميل والتواصل</th>
                      <th className="p-6">الباقة والسعر</th>
                      <th className="p-6">التفاصيل الفنية والمصدر</th>
                      <th className="p-6">الحالة</th>
                      <th className="p-6">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {getFilteredOrders().map((order: any) => (
                      <tr key={order?.orderId} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-6 font-mono text-amber-500">{order?.orderId}</td>
                        <td className="p-6">
                          <div className="text-white font-bold">{order?.customerName || "غير معروف"}</div>
                          <a href={`https://wa.me/${order?.whatsapp?.toString().replace(/\D/g, '') || ''}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-emerald-500/80 text-xs hover:underline mt-1">
                            <MessageCircle size={12} /> {order?.whatsapp || "لا يوجد رقم"}
                          </a>
                        </td>
                        <td className="p-6">
                          <div className="text-white text-sm">{order?.packageName || "غير محدد"}</div>
                          <div className="text-amber-500 font-bold text-xs">{order?.price || 0} SAR</div>
                        </td>
                        <td className="p-6 text-xs text-white/60 max-w-[300px] whitespace-pre-wrap bg-black/20 rounded-lg">
                          {order?.details || "لا توجد تفاصيل"}
                        </td>
                        <td className="p-6">
                          <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold border whitespace-nowrap inline-flex items-center justify-center min-w-[90px] ${order?.status === 'جديد' ? 'border-blue-500/30 text-blue-400 bg-blue-500/5' : order?.status === 'تم التنفيذ' ? 'border-green-500/30 text-green-400 bg-green-500/5' : 'border-amber-500/30 text-amber-400 bg-amber-500/5'}`}>
                            {order?.status || "جديد"}
                          </span>
                        </td>
                        <td className="p-6">
                          <select value={order?.status} onChange={(e) => handleStatusChange(order?.orderId, e.target.value)} className="bg-black border border-white/10 p-2 rounded-lg text-xs cursor-pointer focus:outline-none focus:border-amber-500 text-white">
                            <option value="جديد">جديد</option>
                            <option value="قيد المراجعة">قيد المراجعة</option>
                            <option value="تم التنفيذ">تم التنفيذ</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* تصميم الكروت الخاص بالجوال */}
              <div className="md:hidden space-y-4">
                {getFilteredOrders().map((order: any) => (
                  <div key={order?.orderId} className="bg-[#121212] p-4 rounded-2xl border border-white/5 space-y-3">
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <span className="font-mono text-amber-500 font-bold text-sm">{order?.orderId}</span>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${order?.status === 'جديد' ? 'border-blue-500/30 text-blue-400 bg-blue-500/5' : order?.status === 'تم التنفيذ' ? 'border-green-500/30 text-green-400 bg-green-500/5' : 'border-amber-500/30 text-amber-400 bg-amber-500/5'}`}>
                        {order?.status || "جديد"}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <p className="text-white font-bold text-sm">{order?.customerName || "غير معروف"}</p>
                      <a href={`https://wa.me/${order?.whatsapp?.toString().replace(/\D/g, '') || ''}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-400 text-xs hover:underline">
                        <MessageCircle size={12} /> {order?.whatsapp || "لا يوجد رقم"}
                      </a>
                    </div>

                    <div className="bg-black/40 p-3 rounded-xl space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-white/40">الباقة:</span>
                        <span className="text-white font-bold">{order?.packageName || "غير محدد"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">الإجمالي:</span>
                        <span className="text-amber-500 font-bold">{order?.price || 0} SAR</span>
                      </div>
                    </div>

                    {order?.details && (
                      <div className="text-[11px] text-white/60 bg-black/20 p-2.5 rounded-xl whitespace-pre-wrap">
                        {order.details}
                      </div>
                    )}

                    <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                      <span className="text-xs text-white/40">تغيير الحالة:</span>
                      <select value={order?.status} onChange={(e) => handleStatusChange(order?.orderId, e.target.value)} className="bg-black border border-white/10 p-2 rounded-lg text-xs outline-none text-white focus:border-amber-500">
                        <option value="جديد">جديد</option>
                        <option value="قيد المراجعة">قيد المراجعة</option>
                        <option value="تم التنفيذ">تم التنفيذ</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-[#121212] p-4 md:p-6 rounded-3xl border border-white/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <input placeholder="العنوان" className="bg-black p-3 rounded-xl border border-white/5 text-xs md:text-sm text-white outline-none focus:border-amber-500" onChange={(e) => setNewService({...newService, title: e.target.value})} value={newService.title} />
                <input placeholder="السعر" className="bg-black p-3 rounded-xl border border-white/5 text-xs md:text-sm text-white outline-none focus:border-amber-500" onChange={(e) => setNewService({...newService, price: e.target.value})} value={newService.price} />
                <input placeholder="الوصف" className="bg-black p-3 rounded-xl border border-white/5 text-xs md:text-sm text-white outline-none focus:border-amber-500" onChange={(e) => setNewService({...newService, description: e.target.value})} value={newService.description} />
                <input placeholder="التصنيف" className="bg-black p-3 rounded-xl border border-white/5 text-xs md:text-sm text-white outline-none focus:border-amber-500" onChange={(e) => setNewService({...newService, category: e.target.value})} value={newService.category} />
                <input placeholder="الميزات (بفواصل)" className="sm:col-span-2 bg-black p-3 rounded-xl border border-white/5 text-xs md:text-sm text-white outline-none focus:border-amber-500" onChange={(e) => setNewService({...newService, features: e.target.value})} value={newService.features} />
                <input placeholder="إضافات (العنوان:السعر;العنوان:السعر)" className="sm:col-span-2 bg-black p-3 rounded-xl border border-white/5 text-xs md:text-sm text-white outline-none focus:border-amber-500" onChange={(e) => setNewService({...newService, addons: e.target.value})} value={newService.addons} />
                <button onClick={handleAddService} className="col-span-1 sm:col-span-2 md:col-span-4 bg-amber-500 text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-xs md:text-sm shadow-[0_0_10px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all"><Plus size={18} /> إضافة خدمة جديدة</button>
              </div>
              <div className="space-y-4">
                {getFilteredServices().map((s: any) => (
                  <div key={s.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 md:p-6 bg-[#121212] rounded-2xl border border-white/5 gap-4 transition-all duration-300 hover:border-amber-500">
                    <div>
                      <span className="font-bold text-white text-base md:text-lg">{s.title}</span> - <span className="text-amber-500 font-bold">{s.price} SAR</span>
                      <p className="text-white/40 text-xs mt-1">{s.description} ({s.category})</p>
                    </div>
                    <div className="flex gap-3 self-end sm:self-auto">
                      <button 
                        onClick={() => {
                            let fData = s.features;
                            let aData = s.addons;
                            try {
                               const f = typeof s.features === 'string' ? JSON.parse(s.features) : s.features;
                               fData = Array.isArray(f) ? f.join(', ') : f;
                            } catch(e) {}
                            try {
                               const a = typeof s.addons === 'string' ? JSON.parse(s.addons) : s.addons;
                               aData = Array.isArray(a) ? a.map((i:any) => `${i.title}:${i.price}`).join('; ') : a;
                            } catch(e) {}
                            setEditingService({...s, features: fData, addons: aData});
                        }} 
                        className="text-blue-500 hover:text-blue-400 p-2 bg-white/5 rounded-xl transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDeleteService(s.id)} className="text-red-500 hover:text-red-400 p-2 bg-white/5 rounded-xl transition-all"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {editingService && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
              <div className="bg-[#121212] p-6 md:p-8 rounded-3xl border border-white/10 w-full max-w-lg space-y-3.5 my-auto max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">تعديل الخدمة</h3>
                <input className="w-full bg-black p-3 rounded-xl border border-white/10 text-xs md:text-sm text-white outline-none focus:border-amber-500" value={editingService.title} onChange={(e) => setEditingService({...editingService, title: e.target.value})} placeholder="العنوان" />
                <input className="w-full bg-black p-3 rounded-xl border border-white/10 text-xs md:text-sm text-white outline-none focus:border-amber-500" value={editingService.price} onChange={(e) => setEditingService({...editingService, price: e.target.value})} placeholder="السعر" />
                <textarea className="w-full bg-black p-3 rounded-xl border border-white/10 text-xs md:text-sm text-white outline-none focus:border-amber-500 h-20" value={editingService.description} onChange={(e) => setEditingService({...editingService, description: e.target.value})} placeholder="الوصف" />
                <input className="w-full bg-black p-3 rounded-xl border border-white/10 text-xs md:text-sm text-white outline-none focus:border-amber-500" value={editingService.category} onChange={(e) => setEditingService({...editingService, category: e.target.value})} placeholder="التصنيف" />
                <input className="w-full bg-black p-3 rounded-xl border border-white/10 text-xs md:text-sm text-white outline-none focus:border-amber-500" value={editingService.features} onChange={(e) => setEditingService({...editingService, features: e.target.value})} placeholder="الميزات (بفواصل)" />
                <input className="w-full bg-black p-3 rounded-xl border border-white/10 text-xs md:text-sm text-white outline-none focus:border-amber-500" value={editingService.addons} onChange={(e) => setEditingService({...editingService, addons: e.target.value})} placeholder="إضافات (العنوان:السعر;العنوان:السعر)" />
                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button onClick={handleUpdateService} className="flex-1 bg-amber-500 text-black py-3 rounded-xl font-bold text-xs md:text-sm shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] transition-all">حفظ التغييرات</button>
                  <button onClick={() => setEditingService(null)} className="flex-1 bg-white/5 text-white py-3 rounded-xl font-bold text-xs md:text-sm hover:bg-white/10 transition-all">إلغاء</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}