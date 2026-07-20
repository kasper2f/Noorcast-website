import { getDatabase, ref, push, onValue, off } from 'firebase/database';
// تأكد أن المسار يشير لملفك الذي يحتوي على إعدادات firebase و export app
import { app } from '../dbService'; 

const db = getDatabase(app);

// دالة للحصول على هوية العميل الفريدة (تُحفظ في المتصفح لضمان استمرارية الشات)
export const getChatId = () => {
  let chatId = localStorage.getItem('norkast_chat_id');
  if (!chatId) {
    chatId = 'user_' + Date.now();
    localStorage.setItem('norkast_chat_id', chatId);
  }
  return chatId;
};

// دالة إرسال رسالة
export const sendMessage = (chatId: string, message: string, sender: 'user' | 'admin') => {
  const chatRef = ref(db, 'chats/' + chatId);
  push(chatRef, {
    text: message,
    sender: sender,
    timestamp: Date.now()
  });
};

// دالة الاستماع للرسائل (Real-time)
export const listenToChat = (chatId: string, callback: (data: any) => void) => {
  const chatRef = ref(db, 'chats/' + chatId);
  onValue(chatRef, (snapshot) => {
    callback(snapshot.val());
  });
  // إرجاع دالة الإيقاف (للتنظيف عند إغلاق المكون)
  return () => off(chatRef);
};