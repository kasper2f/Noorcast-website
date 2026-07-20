export interface Order {
  id?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  socialAccounts?: string;
  selectedPackage: string;
  selectedServices: string[];
  totalPrice: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface PortfolioItem {
  id?: string;
  title: string;
  description: string;
  fullDescription: string;
  caseStudy: string;
  projectAssets: { type: 'image' | 'video'; url: string }[];
  category: 'photography' | 'video' | 'design' | 'social_media' | 'تصوير' | 'تصميم' | 'فيديو' | 'إدارة حسابات';
  mediaUrl: string;
  mediaType: 'image' | 'video';
  clientName?: string;
  createdAt: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  duration: string;
  icon: string;
  badge?: string;
}

export interface PackageCategory {
  id: string;
  name: string;
  packages: ServicePackage[];
}

export interface BusinessSolution {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export interface ServiceAddon {
  id: string;
  title: string;
  price: number;
}

export interface CustomServiceItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  features?: string[]; // تمت الإضافة لدعم قائمة الميزات في الكرت
  addons?: ServiceAddon[]; // تمت الإضافة لدعم خيارات الإضافات
}

export interface SuccessPartner {
  id: string;
  name: string;
  logoUrl: string;
  logoScale?: string; // تمت الإضافة لدعم التحكم بالحجم
  invert?: boolean;   // تمت الإضافة لدعم قلب الألوان
}