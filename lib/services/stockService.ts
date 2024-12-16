import { Stock } from "@/lib/types";

export const stockService = {
  async fetchAll(): Promise<Stock[]> {
    const response = await fetch("/api/stocks");
    const data = await response.json();
    return data.data;
  },

  async fetchById(id: number): Promise<Stock> {
    const response = await fetch(`/api/stocks/${id}`);
    const data = await response.json();
    return data.data;
  },

  async create(stock: Partial<Stock>): Promise<Stock[]> {
    const response = await fetch("/api/stocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stock),
    });
    const data = await response.json();
    return data.data;
  },

  async update(stock: Partial<Stock>): Promise<Stock[]> {
    const response = await fetch("/api/stocks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stock),
    });
    const data = await response.json();
    return data.data;
  },

  async delete(id: number): Promise<void> {
    await fetch("/api/stocks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  },

  async duplicate(id: number): Promise<Stock[]> {
    const response = await fetch("/api/stocks/duplicate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    return data.data;
  }
}; 