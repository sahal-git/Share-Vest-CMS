import { Stock } from "@/lib/types";

export const stockService = {
  async fetchAll(): Promise<Stock[]> {
    const response = await fetch("/api/stocks");
    return response.json();
  },

  async fetchById(id: number): Promise<Stock> {
    const response = await fetch(`/api/stocks/${id}`);
    return response.json();
  },

  async create(stock: Partial<Stock>): Promise<Stock[]> {
    const response = await fetch("/api/stocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stock),
    });
    return response.json();
  },

  async update(stock: Partial<Stock>): Promise<Stock[]> {
    const response = await fetch("/api/stocks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stock),
    });
    return response.json();
  },

  async delete(id: number): Promise<Stock[]> {
    const response = await fetch("/api/stocks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    return response.json();
  },

  async duplicate(id: number): Promise<Stock[]> {
    const response = await fetch("/api/stocks/duplicate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    return response.json();
  }
}; 