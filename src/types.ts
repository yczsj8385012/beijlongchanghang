export type FoodCategory =
  | 'near-expiry'
  | 'near-expiry-purchase' // 收临期食品
  | 'expired-disposal'     // 过期食品处理
  | 'frozen-seafood'
  | 'beverages-dairy'
  | 'snacks-sweets'
  | 'liquor-wine'
  | 'grain-oil-condiment';

export type TemperatureZone = 'ambient' | 'chilled' | 'frozen' | 'unconfirmed';

export type PackagingCondition =
  | 'intact_original'
  | 'slightly_worn'
  | 'loose_box'
  | 'damaged_need_repack';

export interface InventoryAssessmentInput {
  productName: string;
  category: FoodCategory;
  quantity: string;
  unit: string;
  productionDate: string;
  shelfLifeMonths: number;
  expiryDateManual: string;
  warehouseCity: string;
  temperatureZone: TemperatureZone;
  packagingCondition: PackagingCondition;
  channelRestrictions: string[];
  notes: string;
}

export interface CalculatedShelfLife {
  totalDays: number;
  remainingDays: number;
  passedDays: number;
  remainingPercentage: number;
  urgencyLevel: 'safe' | 'moderate' | 'urgent' | 'critical' | 'expired';
  urgencyLabel: string;
  colorClass: string;
  recommendation: string;
}

export interface AssessmentResult {
  score: number;
  shelfLife: CalculatedShelfLife;
  missingFields: string[];
  keyStrengths: string[];
  channelSuitability: string[];
  dispositionAdvice: string;
  formattedBrief: string;
}

export interface AiParsedBatch {
  productName: string;
  category: string;
  quantity: string;
  productionDate: string;
  expiryDate: string;
  shelfLifeAnalysis: string;
  storageCondition: string;
  location: string;
  completenessScore: number;
  riskPoints: string[];
  channelAdvice: string;
  longchangxingAdvice: string;
}

export interface CategoryDetail {
  id: FoodCategory;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  iconName: string;
  description: string;
  materialsNeeded: string[];
  boundaryRules: string[];
  commonItems: string[];
}

export interface HubNode {
  city: string;
  region: string;
  role: string;
  features: string[];
  tempCapabilities: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
  highlightTag?: string;
}

export type PageSection =
  | { type: 'lead'; text: string }
  | {
      type: 'facts';
      title: string;
      intro?: string;
      items: Array<{ label: string; value: string }>;
    }
  | {
      type: 'steps';
      title: string;
      intro?: string;
      items: Array<{ title: string; body: string }>;
    }
  | { type: 'checklist'; title: string; intro?: string; items: string[] }
  | {
      type: 'links';
      title: string;
      intro?: string;
      items: Array<{ title: string; body: string; href: string; tag?: string }>;
    }
  | {
      type: 'faq';
      title: string;
      items: Array<{ question: string; answer: string }>;
    }
  | {
      type: 'notice';
      title: string;
      body: string;
      tone: 'info' | 'warning';
    }
  | {
      type: 'source';
      title: string;
      href: string;
      publisher: string;
    };

export interface PageDefinition {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
  sections: PageSection[];
  ctaLabel?: string;
  ctaHref?: string;
  categories?: Array<{ label: string; value: string }>;
  boundary?: string;
  faq?: Array<{ question: string; answer: string }>;
}
