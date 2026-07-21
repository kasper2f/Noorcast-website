import React from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  text?: string; // نص اختياري يظهر تحت الشعار مثل "جاري تحميل معرض الأعمال..."
}

export default function Loader({ text = 'جاري التحميل...' }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 min-h-[300px] w-full">
      {/* الشعار المتحرك بنبض وتوهج */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-4"
      >
        {/* خلفية مضيئة متوهجة خلف الشعار */}
        <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-xl animate-pulse"></div>

        <img
          src="https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782727817/WhatsApp_Image_2026-06-21_at_12.56.07_AM_dhzswc.png"
          alt="NoorCast Loader"
          className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]"
        />
      </motion.div>

      {/* النص المتحرك */}
      <motion.p
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="text-white/70 text-xs md:text-sm font-bold tracking-wider text-center"
      >
        {text}
      </motion.p>
    </div>
  );
}