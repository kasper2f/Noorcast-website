import { ServicePackage, CustomServiceItem, PortfolioItem, SuccessPartner, BusinessSolution, PackageCategory } from './types';

export const packageCategories: PackageCategory[] = [
  {
    id: 'cat1',
    name: 'الهوية البصرية',
    bundleKey: 'branding',
    packages: [
      { id: 'h1', name: 'Launch', description: 'مناسبة للمشاريع الناشئة.', price: 2990, features: ['جلسة اكتشاف العلامة التجارية', 'تصميم شعار احترافي', 'لوحة الألوان', 'نظام الخطوط', 'Brand Pattern', 'دليل استخدام مختصر (Mini Brand Guide)', 'ملفات الشعار بجميع الصيغ', '3 نماذج Mockups احترافية', '3 جولات تعديل'], duration: 'أسبوعين', icon: 'zap' },
      { id: 'h2', name: 'Elevate ⭐', description: 'الأكثر طلبًا.', price: 5990, features: ['كل ما سبق', 'تصميم بطاقة أعمال', 'تصميم ورق رسمي', 'توقيع بريد إلكتروني', 'صور البروفايل والكوفر', 'قوالب منشورات', 'Company Profile (حتى 12 صفحة)', 'Brand Guidelines متكامل', '8 Mockups احترافية', '5 جولات تعديل'], duration: '3 أسابيع', icon: 'trending-up' },
      { id: 'h3', name: 'Signature', description: 'تجربة احترافية متكاملة.', price: 9990, features: ['كل ما سبق', 'تصميم التغليف Packaging', 'أكياس وأكواب', 'Stationery كاملة', 'أيقونات مخصصة', 'عرض تقديمي Presentation Template', 'ملفات قابلة للتعديل', 'أكثر من 15 Mockup', 'استشارة استراتيجية للعلامة'], duration: '4 أسابيع', icon: 'award' }
    ]
  },
  {
    id: 'cat2',
    name: 'إدارة المحتوى',
    bundleKey: 'content_management',
    packages: [
      { id: 'basic', name: 'باقة البداية (التأسيس)', description: 'مثالية للمشاريع الناشئة والبدايات القوية.', price: 1500, features: ['إدارة منصة واحدة', '8 منشورات شهرياً', 'كتابة محتوى', 'جدولة منشورات', 'تقرير أداء', 'دعم واتساب'], duration: 'أسبوعين', icon: 'briefcase' },
      { id: 'pro', name: 'باقة النمو والتفاعل', description: 'إدارة منصتين.', price: 3500, features: ['إدارة منصتين', '16 منشوراً شهرياً', '4 فيديوهات قصيرة', 'كتابة سيناريوهات', 'تفاعل يومي', 'خطة محتوى', 'تقرير مفصل'], duration: 'شهر', icon: 'trending-up' },
      { id: 'elite', name: 'باقة الاحتراف المتكاملة', description: 'إدارة 3-4 منصات.', price: 5900, features: ['إدارة 3-4 منصات', '24 منشوراً شهرياً', '8 فيديوهات قصيرة', 'يوم تصوير كامل', 'فيديو موشن جرافيك', 'إدارة إعلانات', 'دعم فني شامل', 'لوحة تحكم'], duration: 'شهر', icon: 'award' }
    ]
  },
  {
    id: 'cat3',
    name: 'المتاجر الإلكترونية',
    bundleKey: 'e_commerce',
    packages: [
      { id: 'm1', name: 'Launch', description: 'تأسيس المتجر.', price: 3990, features: ['إنشاء المتجر', 'تصميم الصفحة الرئيسية', 'إعداد التصنيفات', 'رفع حتى 30 منتجًا', 'ربط بوابات الدفع', 'ربط شركات الشحن', 'إعداد الصفحات الأساسية', 'تدريب لمدة 30 دقيقة'], duration: 'أسبوعين', icon: 'shopping-cart' },
      { id: 'm2', name: 'Elevate ⭐', description: 'واجهة احترافية.', price: 6490, features: ['كل ما سبق', 'تصميم واجهة احترافية', 'رفع حتى 100 منتج', 'تصميم بنرات', 'صفحات احترافية', 'SEO أساسي', 'كوبونات خصم', 'ربط WhatsApp', 'ربط Google Analytics', 'تدريب ساعة كاملة'], duration: '3 أسابيع', icon: 'trending-up' },
      { id: 'm3', name: 'Signature', description: 'تخصيص كامل.', price: 9990, features: ['كل ما سبق', 'رفع حتى 300 منتج', 'تخصيص كامل للمتجر', 'كتابة محتوى الصفحات', 'تصميم بنرات احترافية', 'تحسين تجربة المستخدم', 'ربط التطبيقات', 'دعم 30 يومًا بعد الإطلاق', 'تقرير تحسينات'], duration: '4 أسابيع', icon: 'award' }
    ]
  },
  {
    id: 'cat4',
    name: 'المواقع الإلكترونية',
    bundleKey: 'web_design',
    packages: [
      { id: 'w1', name: 'Launch', description: 'تصميم سريع.', price: 4990, features: ['حتى 5 صفحات', 'تصميم Responsive', 'نموذج تواصل', 'ربط الواتساب', 'تحسين سرعة أساسي', 'SEO أساسي'], duration: 'أسبوعين', icon: 'globe' },
      { id: 'w2', name: 'Elevate ⭐', description: 'UI مخصص.', price: 7990, features: ['كل ما سبق', 'حتى 10 صفحات', 'تصميم UI مخصص', 'رسوم متحركة خفيفة', 'لوحة تحكم', 'ربط Google Analytics', 'ربط Search Console', 'نموذج طلب خدمات', 'تدريب على إدارة الموقع'], duration: '3 أسابيع', icon: 'trending-up' },
      { id: 'w3', name: 'Signature', description: 'تصميم UX/UI احترافي.', price: 12990, features: ['كل ما سبق', 'صفحات غير محدودة', 'تصميم UX/UI احترافي', 'رسوم متحركة متقدمة', 'Blog', 'تحسين SEO متقدم', 'حماية وأمان', 'دعم فني لمدة شهر', 'تحسين الأداء'], duration: '4 أسابيع', icon: 'award' }
    ]
  },
  {
    id: 'cat5',
    name: 'التصوير الشهري',
    bundleKey: 'photography',
    packages: [
      { id: 'p1', name: 'Launch', description: 'يوم تصوير واحد.', price: 3990, features: ['يوم تصوير واحد', 'حتى 8 فيديوهات Reels', '20 صورة احترافية', 'مونتاج كامل', 'Color Grading'], duration: 'شهر', icon: 'camera' },
      { id: 'p2', name: 'Elevate ⭐', description: 'يومي تصوير.', price: 6990, features: ['كل ما سبق', 'يومي تصوير', 'حتى 16 فيديو Reel', '50 صورة احترافية', 'تصوير Drone', 'كتابة أفكار المحتوى', 'كتابة Caption', 'تصميم 8 منشورات', 'أولوية في التنفيذ'], duration: 'شهر', icon: 'trending-up' },
      { id: 'p3', name: 'Signature', description: '4 أيام تصوير.', price: 10990, features: ['كل ما سبق', '4 أيام تصوير', 'حتى 30 فيديو Reel', '100 صورة احترافية', 'Drone', 'فيديو دعائي قصير شهريًا', 'تصوير منتجات', 'تغطية فعالية واحدة', 'تصميم 20 منشورًا', 'كتابة المحتوى', 'تقرير أداء شهري', 'مدير حساب مخصص', 'تسليم سريع'], duration: 'شهر', icon: 'award' }
    ]
  }
];

export const businessSolutions: any[] = [
  {
    id: 'sol1',
    name: 'إطلاق متجر إلكتروني',
    price: 13900,
    suitableFor: 'البراندات الجديدة التي ترغب بإطلاق متجر إلكتروني احترافي وجاهز للبيع من اليوم الأول.',
    duration: '10–15 يوم عمل',
    features: [
      'تصميم وتطوير متجر إلكتروني احترافي',
      'رفع حتى 30 منتجاً',
      'تصوير حتى 10 منتجات',
      'معالجة وتحرير الصور',
      'كتابة وصف احترافي للمنتجات',
      'تصميم 5 بنرات للمتجر',
      'تصميم صفحة رئيسية احترافية',
      'ربط وسائل الدفع',
      'تحسين سرعة المتجر',
      'تحسين تجربة المستخدم (UX)',
      'تحسين SEO الأساسي',
      'تدريب العميل على استخدام لوحة التحكم'
    ]
  },
  {
    id: 'sol2',
    name: 'إطلاق علامة تجارية',
    price: 18900,
    suitableFor: 'رواد الأعمال والشركات الناشئة الراغبين ببناء هوية متكاملة والانطلاق بشكل احترافي.',
    duration: '15–21 يوم عمل',
    features: [
      'تصميم هوية بصرية كاملة (شعار، الألوان، الخطوط، Brand Guidelines)',
      'تصميم هوية السوشال ميديا والبطاقات الرسمية والتوقيع البريدي',
      'تصميم قوالب المنشورات وصور الحسابات',
      'إنشاء موقع إلكتروني one page أساسي (قابل للتوسع)',
      'رفع حتى 20 منتجاً',
      'جلسة تصوير احترافية وإنتاج 3 فيديوهات قصيرة',
      'كتابة المحتوى الأساسي وإعداد الحسابات الاجتماعية'
    ]
  },
  {
    id: 'sol3',
    name: 'افتتاح مطعم',
    price: 24900,
    suitableFor: 'المطاعم والكافيهات الجديدة التي ترغب بإطلاق علامتها التجارية مع محتوى جاهز للتسويق.',
    duration: '18–25 يوم عمل',
    features: [
      'تصميم الهوية البصرية، المنيو، واللوحات الإعلانية',
      'جلسة تصوير احترافية (المنتجات، المشروبات، الديكور)',
      'تصوير يوم كامل داخل المطعم',
      'إنتاج 6 فيديوهات قصيرة و30 صورة احترافية',
      'كتابة خطة محتوى أول شهر وتصميم منشورات السوشال',
      'إنشاء حسابات التواصل وإعداد Google Business',
      'تصميم QR Menu'
    ]
  }
];

export const customServices: CustomServiceItem[] = [
  { id: 's1', name: 'تصميم شعار', category: 'design', price: 500, description: 'تصميم شعار احترافي يعبر عن هويتك.' }
];

export const initialPortfolio: PortfolioItem[] = [
  {
    id: '1',
    title: 'تغطية متاجر اديداس',
    subCategory: 'تغطية المعارض والمؤتمرات',
    freelancerName: 'أحمد سعيد',
    description: 'تغطية حملات لمتاجر اديداس.',
    fullDescription: 'تصوير وإنتاج مستمر لحملات اديداس المستمرة في محلاتهم ومعارضهم في كل من الرياض وجدة.',
    caseStudy: `دراسة حالة: تغطيات شهرية لحملات adidas...`,
    projectAssets: [
      { type: 'video', url: 'https://youtu.be/PcI1OMn6VKk' },
      { type: 'video', url: 'https://youtu.be/8f61ub-X3ps' }
    ],
    category: 'التصوير',
    mediaUrl: 'https://youtu.be/PcI1OMn6VKk',
    mediaType: 'video',
    clientName: 'اديداس',
    createdAt: '2026-05-15'
  },
  {
    id: '2',
    title: 'تطوير المحتوى البصري',
    subCategory: 'جلسة تصوير لايف ستايل',
    freelancerName: 'سارة خالد',
    description: 'تصميم صور لايف ستايل وصور دعائية.',
    fullDescription: 'تطوير المحتوى البصري بالكامل لشركة اوشن للاثاث ومقرها جدة بالعمل على صور الاثاث بشكل ملفت ويعكس اسلوب الحياة لعملائهم.',
    caseStudy: `مشروع أوشن للأثاث...`,
    projectAssets: [
      { type: 'image', url: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782996634/Untitled_design_1_kehjrs.png' },
      { type: 'image', url: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1783821038/download_2_x4dog1.png' },
      { type: 'image', url: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1783821037/download_ruqyik.png' },
      { type: 'image', url: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1783821036/download_13_a4zojz.png' },
      { type: 'image', url: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1783821035/download_16_niowhg.png' },
      { type: 'image', url: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1783821035/1123-_wx88nn.png' },
      { type: 'image', url: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1783821035/download_9_jivxrp.png' },
      { type: 'image', url: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1783821035/download_1_yuasnx.png' },
      { type: 'image', url: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1783821034/Gemini_Generated_Image_8r6phj8r6phj8r6p-Photoroom_1_tzf92v.png' }
    ],
    category: 'التصوير',
    mediaUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782996634/Untitled_design_1_kehjrs.png',
    mediaType: 'image',
    clientName: 'Ocean',
    createdAt: '2026-06-10'
  },
  {
    id: '3',
    title: 'هوية بصرية لعلامة تجارية',
    subCategory: 'إنشاء هوية بصرية متكاملة',
    freelancerName: 'محمد ناصر',
    description: 'إعداد هوية بصرية متكاملة بما يشمل الشعار والخطوط وحسابات التواصل.',
    fullDescription: 'بناء هوية بصرية متكاملة لبراند روز كاب كيك ابتداءا من مشاركة الافكار والعصف الذهني الى انجاز الهوية بشكل متكامل.',
    caseStudy: `دراسة حالة: بناء الهوية البصرية لعلامة Rose Cupcake...`,
    projectAssets: [{ type: 'image', url: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782983141/Screenshot_6_1_ol8lor.jpg' }],
    category: 'التصميم',
    mediaUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782983141/Screenshot_6_1_ol8lor.jpg',
    mediaType: 'image',
    clientName: 'Rose Cup Cake',
    createdAt: '2026-06-15'
  },
  {
    id: '4',
    title: 'تغطية صالون نسائي (Clara)',
    subCategory: 'تغطية المعارض والمؤتمرات',
    freelancerName: 'معاوية العيسى',
    description: 'إنتاج محتوى مرئي يعكس تجربة العميل داخل الصالون.',
    fullDescription: 'إنتاج إعلان تفاعلي للخدمات الرقمية بجودة سينمائية، يركز على إبراز مميزات الخدمة بأسلوب بصري جذاب ومبسط.',
    caseStudy: 'بهدف تعزيز الحضور الرقمي لعلامة Clara...',
    projectAssets: [{type: 'video', url: 'https://youtu.be/Jh4Ox5FlP2E'}],
    category: 'التصوير',
    mediaUrl: 'https://youtu.be/Jh4Ox5FlP2E',
    mediaType: 'video',
    clientName: 'Clara',
    createdAt: '2026-06-20'
  }
];

export const partners: SuccessPartner[] = [
  { id: '1', name: 'Adidas', logoUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782897349/Adidas-Logo_ataryb.png', logoScale: 'scale-100', invert: true },
  { id: '2', name: 'Off The Road', logoUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782942529/Screenshot_123_ksly59.png', logoScale: 'scale-100', invert: false },
  { id: '3', name: 'Rose cup cake', logoUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782942529/images_2_fmlemb.png', logoScale: 'scale-135', invert: false },
  { id: '4', name: 'Celie Cafe', logoUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782942529/transparent-Photoroom_40_ohx8i0.png', logoScale: 'scale-100', invert: false },
  { id: '5', name: 'Ocean', logoUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782942529/transparent-Photoroom_25_hgw3ib.png', logoScale: 'scale-250', invert: false },
  { id: '6', name: 'Global Group', logoUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782942529/Screenshot_123_2_zvsed9.png', logoScale: 'scale-130', invert: false },
  { id: '7', name: 'UGO', logoUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782942529/Screenshot_123_1_my3nn2.png', logoScale: 'scale-100', invert: true },
  { id: '8', name: 'STC Pay', logoUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782942529/images_2_1_ekfqfq.png', logoScale: 'scale-150', invert: false }
];

export const heroVideos: string[] = [
  'https://youtu.be/WwgWLo6XKxM',
  'https://youtu.be/Jh4Ox5FlP2E',
  'https://youtu.be/KECGo3XPw3Q'
];