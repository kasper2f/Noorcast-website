export const packageCategories: any[] = [
  {
    id: 'cat2',
    name: 'إدارة المحتوى',
    bundleKey: 'content_management',
    packages: [
      { 
        id: 'starter', 
        name: 'باقة الانطلاقة', 
        description: 'مناسبة للمشاريع والعلامات التجارية التي تبحث عن حضور احترافي ومستمر على منصات التواصل.', 
        price: 2500, 
        features: [
          'إدارة حسابات التواصل الاجتماعي (منصتين)', 
          '28 محتوى شهريًا بين الصور والفيديوهات', 
          'جلستا تصوير شهريًا (منتجات، خدمات، المكان)', 
          'كتابة المحتوى والكابشن', 
          'تصميم المحتوى البصري ومونتاج الفيديوهات', 
          'جدولة ونشر المحتوى', 
          'متابعة التعليقات والرسائل الأساسية', 
          'تطوير أفكار المحتوى',
          'تقرير أداء شهري',
          'خصم 15% على جميع خدمات نوركاست الأخرى'
        ], 
        duration: 'شهرياً', 
        icon: 'briefcase' 
      },
      { 
        id: 'growth', 
        name: 'باقة النمو', 
        description: 'مناسبة للعلامات التجارية التي تحتاج إلى حضور أقوى وإنتاج محتوى مستمر ومتنوّع.', 
        price: 6000, 
        features: [
          'إدارة حسابات التواصل الاجتماعي (3 منصات)', 
          '56 محتوى شهريًا بين الصور والفيديوهات', 
          '3 جلسات تصوير شهريًا (منتجات، خدمات، Lifestyle)', 
          'مونتاج احترافي للفيديوهات', 
          'كتابة المحتوى والكابشن', 
          'تصميم المحتوى البصري', 
          'جدولة ونشر المحتوى وإدارة التفاعل والردود', 
          'تطوير أفكار المحتوى وتحسين الهاشتاقات',
          'إدارة الإعلانات على Meta',
          'تقرير أداء وتحليل شهري',
          'خصم 20% على جميع خدمات نوركاست الأخرى'
        ], 
        duration: 'شهرياً', 
        icon: 'trending-up' 
      },
      { 
        id: 'presence', 
        name: 'باقة الحضور', 
        description: 'مناسبة للعلامات التجارية والشركات التي تبحث عن حضور رقمي متكامل وإنتاج محتوى عالي الكثافة.', 
        price: 8000, 
        features: [
          'إدارة حسابات التواصل الاجتماعي (حتى 4 منصات)', 
          'حرية كاملة في توزيع وتنويع المحتوى على حسب الحاجة', 
          '4 جلسات تصوير شهريًا (احترافي + Lifestyle)', 
          'إنتاج فيديوهات قصيرة بمستوى إعلاني', 
          'مونتاج احترافي ومتقدم وتصميمات مخصصة للهوية', 
          'كتابة استراتيجية المحتوى وتطوير الأفكار', 
          'إدارة النشر والجدولة وإدارة التفاعل والردود', 
          'تحليل الأداء والمنافسين مع تقرير شهري متكامل',
          'اجتماع شهري لمراجعة الأداء والخطة القادمة',
          'إدارة الإعلانات الرقمية على منصتين: Meta + TikTok',
          'خصم 25% على جميع خدمات نوركاست الأخرى'
        ], 
        duration: 'شهرياً', 
        icon: 'award' 
      }
    ]
  }
];

export const businessSolutions: any[] = [];

export const customServices: any[] = [
  { id: 's1', name: 'تصميم شعار', category: 'design', price: 500, description: 'تصميم شعار احترافي يعبر عن هويتك.' }
];

export const initialPortfolio: any[] = [
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

export const partners: any[] = [
  { id: '1', name: 'Adidas', logoUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782897349/Adidas-Logo_ataryb.png', logoScale: 'scale-100', invert: true },
  { id: '2', name: 'Off The Road', logoUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782942529/Screenshot_123_ksly59.png', logoScale: 'scale-100', invert: false },
  { id: '3', name: 'Rose cup cake', logoUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782942529/images_2_fmlemb.png', logoScale: 'scale-135', invert: false },
  { id: '4', name: 'Celie Cafe', logoUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782942529/transparent-Photoroom_40_ohx8i0.png', logoScale: 'scale-100', invert: false },
  { id: '5', name: 'Ocean', logoUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782942529/transparent-Photoroom_25_hgw3ib.png', logoScale: 'scale-260', invert: false },
  { id: '6', name: 'Global Group', logoUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782942529/Screenshot_123_2_zvsed9.png', logoScale: 'scale-130', invert: false },
  { id: '7', name: 'UGO', logoUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782942529/Screenshot_123_1_my3nn2.png', logoScale: 'scale-100', invert: true },
  { id: '8', name: 'STC Pay', logoUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1782942529/images_2_1_ekfqfq.png', logoScale: 'scale-150', invert: false },
  
  // --- الشركاء الجدد ---
  { id: '9', name: 'Ministry of Justice', logoUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1790755938/aladal_568991462_mtmfnt.png', logoScale: 'scale-140', invert: false },
  { id: '10', name: 'Aramco', logoUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1790756685/images_12_mvffwn.png', logoScale: 'scale-170', invert: false },
  { id: '11', name: 'Samnan', logoUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1790756645/images_11_qqmlw5.png', logoScale: 'scale-140', invert: false },
  { id: '12', name: 'Homzmart', logoUrl: 'https://res.cloudinary.com/dfwfh4xzb/image/upload/v1790755937/%D9%83%D9%88%D8%AF-%D8%AE%D8%B5%D9%85-homzmart_jgjk1c.png', logoScale: 'scale-130', invert: false }
];
export const heroVideos: string[] = [
  'https://youtu.be/WwgWLo6XKxM',
  'https://youtu.be/Jh4Ox5FlP2E',
  'https://youtu.be/KECGo3XPw3Q'
];