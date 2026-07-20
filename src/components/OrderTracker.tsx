import React, { useState } from 'react';
import { Search, Loader2, Package, CheckCircle } from 'lucide-react';
import { getOrders } from '../dbService';

export default function OrderTracker() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    if (!orderId) return;
    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const allOrders = await getOrders();
      const foundOrder = allOrders.find((o: any) => o.orderId === orderId);
      
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError('عذراً، لم نجد طلباً بهذا الرقم. يرجى التأكد من رقم الطلب.');
      }
    } catch (err) {
      setError('حدث خطأ أثناء البحث، يرجى المحاولة لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 px-6 max-w-lg mx-auto">
      <div className="bg-[#121212] p-8 rounded-3xl border border-white/5 shadow-[0_0_30px_rgba(245,158,11,0.05)] text-center">
        <h2 className="text-2xl font-black mb-6">تتبع حالة طلبك</h2>
        
        <div className="flex items-center bg-black border border-white/5 rounded-xl px-4 py-3 mb-6 focus-within:border-amber-500 transition-all">
          <Search size={18} className="text-amber-500 mr-2" />
          <input 
            type="text" 
            placeholder="أدخل رقم الطلب (مثال: NC-1234)" 
            className="bg-transparent w-full outline-none text-sm text-white placeholder:text-white/20"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
        </div>

        <button 
          onClick={handleTrack}
          disabled={loading}
          className="w-full bg-amber-500 text-black py-3 rounded-xl font-bold hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'بحث عن الطلب'}
        </button>

        {error && <p className="text-red-400 text-xs mt-4">{error}</p>}

        {order && (
          <div className="mt-8 pt-8 border-t border-white/5 text-right space-y-4">
            <div className="flex justify-between">
              <span className="text-white/40 text-xs">رقم الطلب:</span>
              <span className="text-amber-500 font-bold">{order.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40 text-xs">الحالة الحالية:</span>
              <span className="text-white font-bold bg-white/5 px-2 py-1 rounded text-xs">{order.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40 text-xs">الباقة:</span>
              <span className="text-white font-bold">{order.packageName}</span>
            </div>
            <div className="bg-amber-500/10 p-4 rounded-xl mt-4 flex items-center justify-center gap-2 text-amber-500 text-sm font-bold">
              <CheckCircle size={18} /> سيتم التواصل معك عبر الواتساب قريباً
            </div>
          </div>
        )}
      </div>
    </div>
  );
}