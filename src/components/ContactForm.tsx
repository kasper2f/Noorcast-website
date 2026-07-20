import React, { useState } from 'react';

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-[#121212] p-8 rounded-3xl border border-white/5 shadow-[0_0_30px_rgba(245,158,11,0.05)] hover:border-amber-500/30 transition-all duration-500">
      {sent ? (
        <div className="text-center py-10 text-amber-500 font-bold">تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="الاسم الكريم" 
            className="w-full bg-black border border-white/5 p-3 rounded-xl text-white placeholder:text-white/20 focus:border-amber-500 outline-none transition-all" 
            required 
          />
          <input 
            type="email" 
            placeholder="البريد الإلكتروني" 
            className="w-full bg-black border border-white/5 p-3 rounded-xl text-white placeholder:text-white/20 focus:border-amber-500 outline-none transition-all" 
            required 
          />
          <textarea 
            placeholder="كيف يمكننا خدمتك؟" 
            className="w-full bg-black border border-white/5 p-3 rounded-xl text-white placeholder:text-white/20 focus:border-amber-500 outline-none transition-all h-32"
          ></textarea>
          <button 
            type="submit" 
            className="w-full bg-amber-500 text-black font-black py-3 rounded-xl hover:bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all"
          >
            إرسال الطلب
          </button>
        </form>
      )}
    </div>
  );
}