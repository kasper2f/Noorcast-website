import React from 'react';
import { Film, LayoutGrid, Megaphone, HeartHandshake } from 'lucide-react';

export default function WhyUs() {
  const features = [
    {
      title: 'الإنتاج السينمائي',
      desc: 'نملك أحدث كاميرات السينما ومعدات الإضاءة لتقديم تصوير فني عالي الجودة لمنتجاتك ومقر عملك وفيديوهات ترويجية تليق بجمهورك.',
      icon: <Film className="text-amber-500" size={28} />
    },
    {
      title: 'إدارة السوشل ميديا',
      desc: 'بناء خطط استراتيجية وجداول محتوى دورية تواكب ترندات السوق مع كتابة وتصميم المنشورات وجدولتها بدقة متناهية.',
      icon: <LayoutGrid className="text-amber-500" size={28} />
    },
    {
      title: 'باقات تسويقية مرنة',
      desc: 'نوفر خيارات شراء وحجز مباشرة للباقات الشهرية، أو تفصيل باقة خاصة بميزانيتك وطلباتك مع تتبع مباشر لحالتها السحابية.',
      icon: <Megaphone className="text-amber-500" size={28} />
    },
    {
      title: 'رعاية وتفاعل مجتمعي',
      desc: 'فريق رعاية عملاء متخصص للرد الفوري على تعليقات واستفسارات متابعيك لبناء علاقة ثقة وولاء قوية معهم.',
      icon: <HeartHandshake className="text-amber-500" size={28} />
    }
  ];

  return (
    <section className="bg-[#050505] text-white py-14 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-amber-500 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase mb-3 md:mb-4 block">#رؤية_شاملة_للنجاح</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black">لماذا تختار نوركاست؟</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((item, index) => (
            <div key={index} className="bg-zinc-900/50 p-6 md:p-8 rounded-3xl border border-white/5 hover:border-amber-500/30 transition-all group flex flex-col justify-between">
              <div>
                <div className="mb-4 md:mb-6 p-3.5 md:p-4 bg-white/5 w-fit rounded-2xl group-hover:bg-amber-500/10 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4">{item.title}</h3>
                <p className="text-white/60 leading-relaxed text-xs md:text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}