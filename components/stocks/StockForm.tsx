"use client";

import { useState } from "react";
import { Stock } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface StockFormProps {
  stock?: Stock;
  onSubmit: (stock: Partial<Stock>) => void;
}

export function StockForm({ stock, onSubmit }: StockFormProps) {
  const [formData, setFormData] = useState<Partial<Stock>>(stock || {
    name: "",
    full_name: "",
    industry: "",
    description: "",
    price: "",
    status: "+0.00 (0.00%) today",
    about: "",
    stock_link: "",
    financial_details: {
      debt_to_assets_ratio: "Low",
      non_compliant_income_ratio: "Below 5%",
      market_cap: "0 cr"
    },
    performance: {
      stock_performance: "New",
      growth_potential: "Unknown"
    },
    fundamentals: {
      profitMargin: "0%",
      operatingMargin: "0%",
      returnOnEquity: "0%",
      returnOnAssets: "0%",
      revenueGrowth: "0%",
      earningsGrowth: "0%",
      currentRatio: "0",
      quickRatio: "0",
      dividendYield: "0%",
      priceToBook: "0"
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateFundamentals = (key: keyof Stock['fundamentals'], value: string) => {
    setFormData({
      ...formData,
      fundamentals: {
        ...formData.fundamentals!,
        [key]: value
      }
    });
  };

  const updateFinancialDetails = (key: keyof Stock['financial_details'], value: string) => {
    setFormData({
      ...formData,
      financial_details: {
        ...formData.financial_details!,
        [key]: value
      }
    });
  };

  const updatePerformance = (key: keyof Stock['performance'], value: string) => {
    setFormData({
      ...formData,
      performance: {
        ...formData.performance!,
        [key]: value
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="financial">Financial Details</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Stock Symbol</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="full_name">Company Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="about">About</Label>
            <Textarea
              id="about"
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="stock_link">Company Website</Label>
            <Input
              id="stock_link"
              type="url"
              value={formData.stock_link}
              onChange={(e) => setFormData({ ...formData, stock_link: e.target.value })}
              required
            />
          </div>
        </TabsContent>

        <TabsContent value="financial" className="mt-4">
          <Card className="p-4 space-y-4">
            <div>
              <Label>Debt to Assets Ratio</Label>
              <Input
                value={formData.financial_details?.debt_to_assets_ratio}
                onChange={(e) => updateFinancialDetails('debt_to_assets_ratio', e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Non-Compliant Income Ratio</Label>
              <Input
                value={formData.financial_details?.non_compliant_income_ratio}
                onChange={(e) => updateFinancialDetails('non_compliant_income_ratio', e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Market Cap</Label>
              <Input
                value={formData.financial_details?.market_cap}
                onChange={(e) => updateFinancialDetails('market_cap', e.target.value)}
                required
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-4">
          <Card className="p-4 space-y-4">
            <div>
              <Label>Current Price (₹)</Label>
              <Input
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Status</Label>
              <Input
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Stock Performance</Label>
              <Input
                value={formData.performance?.stock_performance}
                onChange={(e) => updatePerformance('stock_performance', e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Growth Potential</Label>
              <Input
                value={formData.performance?.growth_potential}
                onChange={(e) => updatePerformance('growth_potential', e.target.value)}
                required
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="fundamentals" className="mt-4">
          <Card className="p-4 grid grid-cols-2 gap-4">
            <div>
              <Label>Profit Margin</Label>
              <Input
                value={formData.fundamentals?.profitMargin}
                onChange={(e) => updateFundamentals('profitMargin', e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Operating Margin</Label>
              <Input
                value={formData.fundamentals?.operatingMargin}
                onChange={(e) => updateFundamentals('operatingMargin', e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Return on Equity</Label>
              <Input
                value={formData.fundamentals?.returnOnEquity}
                onChange={(e) => updateFundamentals('returnOnEquity', e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Return on Assets</Label>
              <Input
                value={formData.fundamentals?.returnOnAssets}
                onChange={(e) => updateFundamentals('returnOnAssets', e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Revenue Growth</Label>
              <Input
                value={formData.fundamentals?.revenueGrowth}
                onChange={(e) => updateFundamentals('revenueGrowth', e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Earnings Growth</Label>
              <Input
                value={formData.fundamentals?.earningsGrowth}
                onChange={(e) => updateFundamentals('earningsGrowth', e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Current Ratio</Label>
              <Input
                value={formData.fundamentals?.currentRatio}
                onChange={(e) => updateFundamentals('currentRatio', e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Quick Ratio</Label>
              <Input
                value={formData.fundamentals?.quickRatio}
                onChange={(e) => updateFundamentals('quickRatio', e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Dividend Yield</Label>
              <Input
                value={formData.fundamentals?.dividendYield}
                onChange={(e) => updateFundamentals('dividendYield', e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Price to Book</Label>
              <Input
                value={formData.fundamentals?.priceToBook}
                onChange={(e) => updateFundamentals('priceToBook', e.target.value)}
                required
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button type="submit">
          {stock ? "Update Stock" : "Add Stock"}
        </Button>
      </div>
    </form>
  );
} 