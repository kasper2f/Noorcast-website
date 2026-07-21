import { initializeApp } from 'firebase/app';

// رابط الـ Web App الخاص بـ Google Sheets
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzlL0sfoWhBFXXoLd9ZiPu6boq9WvLlalu4_kf6DkXMdQtmf-XMM32Hxrq0TzFPga3K/exec';

// إعدادات Firebase للاتصال بقاعدة بيانات Realtime (لخدمة الشات المباشر)
const firebaseConfig = {
  apiKey: "AIzaSyBuASn2zREWSf9w4klqsrkn_IsUiOoM8hc",
  authDomain: "noorcast-53ecf.firebaseapp.com",
  projectId: "noorcast-53ecf",
  storageBucket: "noorcast-53ecf.firebasestorage.app",
  messagingSenderId: "126242239603",
  appId: "1:126242239603:web:9834da65953f0ef9066606",
  databaseURL: "https://noorcast-53ecf-default-rtdb.firebaseio.com/"
};

// تهيئة Firebase وتصدير app ليتم استخدامة في chatService.ts
export const app = initializeApp(firebaseConfig);

// --- دوال الطلبات ---

export const getOrders = async () => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL + '?action=get');
    return await response.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const createOrder = async (orderData: any) => {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'create', ...orderData })
    });
    return "Success";
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update', orderId, status })
    });
    return "Success";
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

// --- دوال الخدمات والكوبونات ---

export const getServices = async () => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL + '?action=getServices&_t=' + Date.now());
    const data = await response.json();
    
    // تعديل التنظيف: ضمان أن كل تصنيف نظيف من أي مسافات زائدة لضمان تطابق الفلترة
    return Array.isArray(data) ? data.map((s: any) => ({
      ...s,
      category: s.category ? String(s.category).trim() : 'أخرى'
    })) : [];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

export const getCoupons = async () => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL + '?action=getCoupons&_t=' + Date.now());
    return await response.json();
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return [];
  }
};

// --- دوال معرض الأعمال (Portfolio) ---

export const getPortfolio = async () => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL + '?action=getPortfolio&_t=' + Date.now());
    const data = await response.json();
    
    // معالجة البيانات وتحويل روابط projectAssets إلى مصفوفة ذكية
    return data.map((item: any) => ({
      ...item,
      projectAssets: item.projectAssets 
        ? item.projectAssets.split(',').map((url: string) => ({
            type: url.includes('youtu') ? 'video' : 'image',
            url: url.trim()
          }))
        : []
    }));
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return [];
  }
};

// --- دوال إدارة الخدمات ---

export const addService = async (serviceData: any) => {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'addService', ...serviceData })
    });
    return "Success";
  } catch (error) {
    console.error("Error adding service:", error);
    throw error;
  }
};

export const updateService = async (serviceData: any) => {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'updateService', ...serviceData })
    });
    return "Success";
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

export const deleteService = async (serviceId: string) => {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'deleteService', serviceId })
    });
    return "Success";
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};