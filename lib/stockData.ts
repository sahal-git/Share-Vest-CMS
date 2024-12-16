import { Stock } from './types';

export const stocks: Stock[] = [
  {
    id: 1,
    name: "Sun Pharma",
    full_name: "Sun Pharmaceutical Industries Ltd",
    industry: "Pharmaceuticals",
    description: "A leading Indian pharmaceutical company focusing on generic and specialty drugs, compliant with Shariah law.",
    financial_details: {
      debt_to_assets_ratio: "Low",
      non_compliant_income_ratio: "Below 5%",
      market_cap: "424,476.57 cr"
    },
    performance: {
      stock_performance: "Consistently strong",
      growth_potential: "High"
    },
    about: "Founded in 1983, committed to ethical business practices.",
    stock_link: "https://www.sunpharma.com",
    price: "1,050.45",
    status: "+0.100 (0.10%) today",
    Share_Vest_Featured: true,
    fundamentals: {
      profitMargin: "15.2%",
      operatingMargin: "18.5%",
      returnOnEquity: "22.4%",
      returnOnAssets: "12.8%",
      revenueGrowth: "25.6%",
      earningsGrowth: "18.9%",
      currentRatio: "2.1",
      quickRatio: "1.8",
      dividendYield: "1.5%",
      priceToBook: "4.2"
    }
  }
  // Add more stocks as needed
]; 