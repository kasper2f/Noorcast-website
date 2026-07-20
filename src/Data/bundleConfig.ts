export const BUNDLE_CATEGORIES: Record<string, { title: string; services: { id: string; title: string; price: number; points: number }[] }> = {
  content_management: {
    title: "إدارة المحتوى",
    services: [
      { id: 'mng_1', title: 'إدارة منصة واحدة', price: 800, points: 10 },
      { id: 'mng_2', title: 'إدارة منصتين', price: 1400, points: 18 },
      { id: 'mng_3', title: 'إدارة 3-4 منصات', price: 2000, points: 25 },
      { id: 'posts_8', title: '8 منشورات شهرياً', price: 600, points: 5 },
      { id: 'posts_16', title: '16 منشور شهرياً', price: 1100, points: 10 },
      { id: 'posts_24', title: '24 منشور شهرياً', price: 1500, points: 15 },
      { id: 'vid_4', title: '4 فيديوهات قصيرة', price: 1200, points: 8 },
      { id: 'vid_8', title: '8 فيديوهات قصيرة', price: 2000, points: 15 },
      { id: 'write_content', title: 'كتابة محتوى', price: 400, points: 4 },
      { id: 'write_script', title: 'كتابة سيناريوهات', price: 400, points: 4 },
      { id: 'plan_monthly', title: 'خطة محتوى', price: 500, points: 5 },
      { id: 'daily_interact', title: 'تفاعل يومي', price: 600, points: 6 },
      { id: 'report', title: 'تقرير أداء', price: 300, points: 3 },
      { id: 'whatsapp', title: 'دعم واتساب', price: 300, points: 3 },
      { id: 'motion', title: 'فيديو موشن جرافيك', price: 1200, points: 10 },
      { id: 'ads_mgmt', title: 'إدارة إعلانات', price: 1000, points: 10 },
      { id: 'support', title: 'دعم فني شامل', price: 500, points: 5 },
      { id: 'dashboard', title: 'لوحة تحكم', price: 500, points: 5 }
    ]
  },
  e_commerce: {
    title: "المتاجر الإلكترونية",
    services: [
      { id: 'store_launch', title: 'إنشاء المتجر', price: 3000, points: 20 },
      { id: 'design_home', title: 'تصميم الصفحة الرئيسية', price: 1000, points: 8 },
      { id: 'design_ui', title: 'تصميم واجهة احترافية', price: 1500, points: 12 },
      { id: 'cat_setup', title: 'إعداد التصنيفات', price: 400, points: 4 },
      { id: 'products_30', title: 'رفع 30 منتج', price: 600, points: 5 },
      { id: 'products_100', title: 'رفع 100 منتج', price: 1200, points: 10 },
      { id: 'products_300', title: 'رفع 300 منتج', price: 2000, points: 18 },
      { id: 'payment_gate', title: 'ربط بوابات دفع', price: 500, points: 5 },
      { id: 'shipping_link', title: 'ربط شركات شحن', price: 500, points: 5 },
      { id: 'pages_basic', title: 'إعداد الصفحات الأساسية', price: 600, points: 6 },
      { id: 'pages_pro', title: 'صفحات احترافية', price: 1000, points: 8 },
      { id: 'ads_mgmt', title: 'إدارة حملات إعلانية', price: 1000, points: 10 },
      { id: 'content_write', title: 'كتابة محتوى الصفحات', price: 800, points: 8 },
      { id: 'banners', title: 'تصميم بنرات احترافية', price: 700, points: 6 },
      { id: 'seo_basic', title: 'SEO أساسي', price: 500, points: 5 },
      { id: 'coupons', title: 'كوبونات خصم', price: 200, points: 2 },
      { id: 'whatsapp_link', title: 'ربط WhatsApp', price: 300, points: 3 },
      { id: 'analytics', title: 'ربط Google Analytics', price: 300, points: 3 },
      { id: 'ux_improve', title: 'تحسين تجربة المستخدم', price: 1200, points: 10 },
      { id: 'app_link', title: 'ربط التطبيقات', price: 600, points: 6 },
      { id: 'support_30', title: 'دعم 30 يومًا بعد الإطلاق', price: 1000, points: 10 },
      { id: 'report_improve', title: 'تقرير تحسينات', price: 400, points: 4 },
      { id: 'training', title: 'تدريب 30 دقيقة', price: 300, points: 3 },
      { id: 'training_hour', title: 'تدريب ساعة كاملة', price: 600, points: 6 }
    ]
  },
  web_design: {
    title: "المواقع الإلكترونية",
    services: [
      { id: 'web_5', title: 'موقع حتى 5 صفحات', price: 4000, points: 25 },
      { id: 'web_10', title: 'موقع حتى 10 صفحات', price: 7000, points: 40 },
      { id: 'web_unlimited', title: 'صفحات غير محدودة', price: 10000, points: 60 },
      { id: 'responsive', title: 'تصميم متجاوب (Responsive)', price: 800, points: 8 },
      { id: 'ui_ux', title: 'تصميم UI/UX احترافي', price: 1500, points: 15 },
      { id: 'motion_light', title: 'رسوم متحركة خفيفة', price: 700, points: 7 },
      { id: 'motion_adv', title: 'رسوم متحركة متقدمة', price: 1200, points: 12 },
      { id: 'contact_form', title: 'نموذج تواصل', price: 300, points: 3 },
      { id: 'web_analytics', title: 'ربط Google Analytics', price: 200, points: 2 },
      { id: 'search_console', title: 'ربط Search Console', price: 200, points: 2 },
      { id: 'service_form', title: 'نموذج طلب خدمات', price: 500, points: 5 },
      { id: 'blog', title: 'Blog', price: 800, points: 8 },
      { id: 'seo_basic', title: 'SEO أساسي', price: 500, points: 5 },
      { id: 'seo_adv', title: 'تحسين SEO متقدم', price: 1200, points: 12 },
      { id: 'security', title: 'حماية وأمان', price: 800, points: 8 },
      { id: 'web_support', title: 'دعم فني لمدة شهر', price: 1000, points: 10 },
      { id: 'performance', title: 'تحسين الأداء', price: 600, points: 6 },
      { id: 'training_web', title: 'تدريب على إدارة الموقع', price: 500, points: 5 }
    ]
  },
  branding: {
    title: "الهوية البصرية",
    services: [
      { id: 'brand_discovery', title: 'جلسة اكتشاف العلامة', price: 800, points: 8 },
      { id: 'logo_pro', title: 'تصميم شعار احترافي', price: 1800, points: 18 },
      { id: 'colors', title: 'لوحة الألوان', price: 400, points: 4 },
      { id: 'fonts', title: 'نظام الخطوط', price: 400, points: 4 },
      { id: 'pattern', title: 'Brand Pattern', price: 500, points: 5 },
      { id: 'mini_guide', title: 'دليل استخدام مختصر', price: 600, points: 6 },
      { id: 'files', title: 'ملفات الشعار بجميع الصيغ', price: 300, points: 3 },
      { id: 'mockups_3', title: '3 نماذج Mockups', price: 500, points: 5 },
      { id: 'mockups_8', title: '8 نماذج Mockups', price: 900, points: 9 },
      { id: 'mockups_15', title: '15 نموذج Mockup', price: 1500, points: 15 },
      { id: 'revisions_3', title: '3 جولات تعديل', price: 500, points: 5 },
      { id: 'revisions_5', title: '5 جولات تعديل', price: 800, points: 8 },
      { id: 'business_card', title: 'تصميم بطاقة أعمال', price: 400, points: 4 },
      { id: 'letterhead', title: 'تصميم ورق رسمي', price: 300, points: 3 },
      { id: 'email_sig', title: 'توقيع بريد إلكتروني', price: 200, points: 2 },
      { id: 'social_assets', title: 'صور البروفايل والكوفر', price: 400, points: 4 },
      { id: 'social_kits', title: 'قوالب منشورات', price: 700, points: 7 },
      { id: 'profile_12', title: 'Company Profile (12 صفحة)', price: 1500, points: 15 },
      { id: 'brand_guide_full', title: 'Brand Guidelines متكامل', price: 1800, points: 18 },
      { id: 'packaging', title: 'تصميم التغليف', price: 1200, points: 12 },
      { id: 'stationery', title: 'Stationery كاملة', price: 900, points: 9 },
      { id: 'icons', title: 'أيقونات مخصصة', price: 500, points: 5 },
      { id: 'presentation', title: 'عرض تقديمي', price: 1000, points: 10 },
      { id: 'editable', title: 'ملفات قابلة للتعديل', price: 800, points: 8 },
      { id: 'strategy', title: 'استشارة استراتيجية', price: 1200, points: 12 }
    ]
  },
  photography: {
    title: "التصوير الشهري",
    services: [
      { id: 'photo_1day', title: 'يوم تصوير واحد', price: 1500, points: 15 },
      { id: 'photo_2day', title: 'يومي تصوير', price: 2800, points: 28 },
      { id: 'photo_4day', title: '4 أيام تصوير', price: 5000, points: 50 },
      { id: 'reels_8', title: 'حتى 8 فيديوهات Reels', price: 1800, points: 15 },
      { id: 'reels_16', title: 'حتى 16 فيديو Reel', price: 3000, points: 25 },
      { id: 'reels_30', title: 'حتى 30 فيديو Reel', price: 5000, points: 45 },
      { id: 'photos_20', title: '20 صورة احترافية', price: 800, points: 8 },
      { id: 'photos_50', title: '50 صورة احترافية', price: 1500, points: 15 },
      { id: 'photos_100', title: '100 صورة احترافية', price: 2500, points: 25 },
      { id: 'drone', title: 'تصوير Drone', price: 1200, points: 12 },
      { id: 'full_montage', title: 'مونتاج كامل', price: 1000, points: 10 },
      { id: 'color_grade', title: 'Color Grading', price: 600, points: 6 },
      { id: 'script', title: 'كتابة سيناريوهات', price: 400, points: 4 },
      { id: 'caption', title: 'كتابة Caption', price: 200, points: 2 },
      { id: 'social_design_8', title: 'تصميم 8 منشورات', price: 700, points: 7 },
      { id: 'social_design_20', title: 'تصميم 20 منشورًا', price: 1500, points: 15 },
      { id: 'priority', title: 'أولوية في التنفيذ', price: 500, points: 5 },
      { id: 'fast_delivery', title: 'تسليم سريع', price: 500, points: 5 },
      { id: 'promo_video', title: 'فيديو دعائي قصير', price: 1000, points: 10 },
      { id: 'product_photo', title: 'تصوير منتجات', price: 1200, points: 12 },
      { id: 'event_coverage', title: 'تغطية فعالية واحدة', price: 1500, points: 15 },
      { id: 'content_write', title: 'كتابة المحتوى', price: 400, points: 4 },
      { id: 'report', title: 'تقرير أداء شهري', price: 400, points: 4 }
    ]
  },
  // حلول الأعمال (أسعار ثابتة متكاملة 13,900 / 18,900 / 24,900):
  solution_ecommerce: {
    title: "تخصيص باقة: إطلاق متجر إلكتروني",
    services: [
      { id: 'ec_store_dev', title: 'تصميم وتطوير متجر إلكتروني احترافي', price: 13900, points: 0 },
      { id: 'ec_products_30', title: 'رفع حتى 30 منتجاً', price: 0, points: 0 },
      { id: 'ec_photo_10', title: 'تصوير حتى 10 منتجات', price: 0, points: 0 },
      { id: 'ec_editing', title: 'معالجة وتحرير الصور', price: 0, points: 0 },
      { id: 'ec_desc', title: 'كتابة وصف احترافي للمنتجات', price: 0, points: 0 },
      { id: 'ec_banners', title: 'تصميم 5 بنرات للمتجر', price: 0, points: 0 },
      { id: 'ec_home', title: 'تصميم صفحة رئيسية احترافية', price: 0, points: 0 },
      { id: 'ec_payments', title: 'ربط وسائل الدفع والشحن', price: 0, points: 0 },
      { id: 'ec_speed', title: 'تحسين سرعة المتجر وتجربة المستخدم (UX)', price: 0, points: 0 },
    ]
  },
  solution_brand: {
    title: "تخصيص باقة: إطلاق علامة تجارية",
    services: [
      { id: 'br_identity', title: 'تصميم هوية بصرية كاملة (شعار، الألوان، الخطوط)', price: 18900, points: 0 },
      { id: 'br_social', title: 'تصميم هوية السوشال ميديا والبطاقات الرسمية', price: 0, points: 0 },
      { id: 'br_templates', title: 'تصميم قوالب المنشورات وصور الحسابات', price: 0, points: 0 },
      { id: 'br_web', title: 'إنشاء موقع إلكتروني one page أساسي', price: 0, points: 0 },
      { id: 'br_products', title: 'رفع حتى 20 منتجاً', price: 0, points: 0 },
      { id: 'br_shoot', title: 'جلسة تصوير احترافية وإنتاج 3 فيديوهات قصيرة', price: 0, points: 0 },
    ]
  },
  solution_restaurant: {
    title: "تخصيص باقة: افتتاح مطعم",
    services: [
      { id: 'res_identity', title: 'تصميم الهوية البصرية، المنيو، واللوحات الإعلانية', price: 24900, points: 0 },
      { id: 'res_shoot_session', title: 'جلسة تصوير احترافية (المنتجات، المشروبات، الديكور)', price: 0, points: 0 },
      { id: 'res_full_day', title: 'تصوير يوم كامل داخل المطعم', price: 0, points: 0 },
      { id: 'res_videos', title: 'إنتاج 6 فيديوهات قصيرة و30 صورة احترافية', price: 0, points: 0 },
      { id: 'res_content_plan', title: 'كتابة خطة محتوى أول شهر وتصميم منشورات السوشال', price: 0, points: 0 },
      { id: 'res_qr_menu', title: 'تصميم QR Menu وإعداد حسابات التواصل وGoogle Business', price: 0, points: 0 },
    ]
  }
};

export const DISCOUNT_TIERS = [
  { points: 30, discount: 0.05 },
  { points: 50, discount: 0.10 },
  { points: 80, discount: 0.15 },
  { points: 120, discount: 0.20 },
];