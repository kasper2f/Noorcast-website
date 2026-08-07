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

// --- نظام التخزين المؤقت الذكي والمستقل لكل قسم (لتجنب أي تأخير أو تداخل) ---
let cachedServices: any = null;
let cachedPortfolio: any = null;
let cachedMagazine: any = null;
let cachedCoupons: any = null;
let cachedAdmins: any = null;
let cachedOrders: any = null;

export const clearCache = () => {
  cachedServices = null;
  cachedPortfolio = null;
  cachedMagazine = null;
  cachedCoupons = null;
  cachedAdmins = null;
  cachedOrders = null;
};

// --- دوال الطلبات ---

export const getOrders = async () => {
  try {
    if (cachedOrders) return cachedOrders;
    const response = await fetch(GOOGLE_SCRIPT_URL + '?action=get&_t=' + Date.now());
    const data = await response.json();
    cachedOrders = data;
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const createOrder = async (orderData: any) => {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'create', ...orderData })
    });
    clearCache();
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
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'update', orderId, status })
    });
    clearCache();
    return "Success";
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

// --- دوال المشرفين (Admins) ---

export const getAdmins = async () => {
  try {
    if (cachedAdmins) return cachedAdmins;
    const response = await fetch(GOOGLE_SCRIPT_URL + '?action=getAdmins&_t=' + Date.now());
    const data = await response.json();
    cachedAdmins = data;
    return data;
  } catch (error) {
    console.error("Error fetching admins:", error);
    return [];
  }
};

// --- دوال الخدمات والكوبونات ---

export const getServices = async () => {
  try {
    if (cachedServices) return cachedServices;
    const response = await fetch(GOOGLE_SCRIPT_URL + '?action=getServices&_t=' + Date.now());
    const data = await response.json();
    
    const formatted = Array.isArray(data) ? data.map((s: any) => ({
      ...s,
      category: s.category ? String(s.category).trim() : 'أخرى'
    })) : [];

    cachedServices = formatted;
    return formatted;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

export const getCoupons = async () => {
  try {
    if (cachedCoupons) return cachedCoupons;
    const response = await fetch(GOOGLE_SCRIPT_URL + '?action=getCoupons&_t=' + Date.now());
    const data = await response.json();
    cachedCoupons = data;
    return data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return [];
  }
};

// --- دوال معرض الأعمال (Portfolio) ---

export const getPortfolio = async () => {
  try {
    if (cachedPortfolio) return cachedPortfolio;
    const response = await fetch(GOOGLE_SCRIPT_URL + '?action=getPortfolio&_t=' + Date.now());
    const data = await response.json();
    
    const formatted = data.map((item: any) => ({
      ...item,
      projectAssets: item.projectAssets 
        ? item.projectAssets.split(',').map((url: string) => ({
            type: url.includes('youtu') ? 'video' : 'image',
            url: url.trim()
          }))
        : []
    }));

    cachedPortfolio = formatted;
    return formatted;
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return [];
  }
};

// --- دوال المجلة الفنية (Magazine) ---
export const getMagazine = async () => {
  try {
    if (cachedMagazine) return cachedMagazine;
    const response = await fetch(GOOGLE_SCRIPT_URL + '?action=getMagazine&_t=' + Date.now());
    const data = await response.json();
    cachedMagazine = Array.isArray(data) ? data : [];
    return cachedMagazine;
  } catch (error) {
    console.error("Error fetching magazine:", error);
    return [];
  }
};

// --- دوال إدارة الخدمات (محدثة لضمان التزامن السريع مع جوجل شيت وتفريغ الكاش) ---

export const addService = async (serviceData: any) => {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'addService', ...serviceData })
    });
    clearCache();
    await new Promise(resolve => setTimeout(resolve, 1000));
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
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'updateService', ...serviceData })
    });
    clearCache();
    await new Promise(resolve => setTimeout(resolve, 1000));
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
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'deleteService', serviceId })
    });
    clearCache();
    await new Promise(resolve => setTimeout(resolve, 1000));
    return "Success";
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};