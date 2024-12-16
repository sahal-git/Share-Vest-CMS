export interface Chapter {
  id: number;
  title: string;
  videoUrl: string;
}

export interface Course {
  id: number;
  name: string;
  imageCode: string;
  imageUrl: string;
  published: boolean;
  intro: boolean;
  category: string;
  chapters: Chapter[];
}

export interface StockFundamentals {
  profitMargin: string;
  operatingMargin: string;
  returnOnEquity: string;
  returnOnAssets: string;
  revenueGrowth: string;
  earningsGrowth: string;
  currentRatio: string;
  quickRatio: string;
  dividendYield: string;
  priceToBook: string;
}

export interface FinancialDetails {
  debt_to_assets_ratio: string;
  non_compliant_income_ratio: string;
  market_cap: string;
}

export interface Performance {
  stock_performance: string;
  growth_potential: string;
}

export interface Stock {
  id: number;
  name: string;
  full_name: string;
  industry: string;
  description: string;
  financial_details: FinancialDetails;
  performance: Performance;
  about: string;
  stock_link: string;
  price: string;
  status: string;
  Share_Vest_Featured: boolean;
  fundamentals: StockFundamentals;
}