// واجهة بيانات السجل (Audit Log)
export interface AuditLogData {
  adminEmail: string;
  action: 'LOGIN_SUCCESS' | 'LOGIN_FAILED' | 'UPDATE_ORDER' | 'ADD_SERVICE' | 'UPDATE_SERVICE' | 'DELETE_SERVICE';
  target: string;
  details: string;
}

// رابط نشر Google Apps Script الخاص بك
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzlL0sfoWhBFXXoLd9ZiPu6boq9WvLlalu4_kf6DkXMdQtmf-XMM32Hxrq0TzFPga3K/exec';

/**
 * دالة تسجيل الأنشطة والأحداث وإرسالها إلى قوقل شيت
 */
export async function logActivity(data: AuditLogData) {
  try {
    const timestamp = new Date().toISOString();
    
    const logPayload = {
      type: 'AUDIT_LOG',
      timestamp,
      adminEmail: data.adminEmail,
      action: data.action,
      target: data.target,
      details: data.details,
    };

    // طباعة السجل في الكونسول للتأكد أثناء التطوير
    console.log('[AUDIT LOG RECORDED]:', logPayload);

    // إرسال البيانات مباشرة إلى قوقل شيت عبر الـ API
    if (GOOGLE_SCRIPT_URL) {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // لتجنب مشاكل CORS مع قوقل
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logPayload),
      });
    }

    return true;
  } catch (error) {
    console.error('Error recording audit log:', error);
    return false;
  }
}