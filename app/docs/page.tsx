"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const endpoints = [
  {
    method: "GET",
    path: "/api/courses",
    description: "Retrieve all courses",
    response: {
      type: "Course[]",
      example: [
        {
          id: 1,
          name: "Stock Market Basics",
          imageCode: "FINSsC9P50Y",
          imageUrl: "https://example.com/image.jpg",
          category: "Beginner",
          published: true,
          chapters: [
            {
              id: 1,
              title: "Introduction to Stocks",
              videoUrl: "https://example.com/video.mp4"
            }
          ]
        }
      ]
    }
  },
  {
    method: "POST",
    path: "/api/courses",
    description: "Create a new course",
    request: {
      type: "Partial<Course>",
      example: {
        name: "New Course",
        imageCode: "CODE123",
        imageUrl: "https://example.com/image.jpg",
        category: "Advanced",
        chapters: []
      }
    },
    response: {
      type: "Course[]",
      description: "Returns updated list of all courses"
    }
  },
  {
    method: "PUT",
    path: "/api/courses",
    description: "Update an existing course",
    request: {
      type: "Partial<Course>",
      example: {
        id: 1,
        name: "Updated Course Name"
      }
    },
    response: {
      type: "Course[]",
      description: "Returns updated list of all courses"
    }
  },
  {
    method: "DELETE",
    path: "/api/courses",
    description: "Delete a course",
    request: {
      type: "{ id: number }",
      example: {
        id: 1
      }
    },
    response: {
      type: "Course[]",
      description: "Returns updated list of all courses"
    }
  },
  {
    method: "POST",
    path: "/api/courses/duplicate",
    description: "Duplicate an existing course",
    request: {
      type: "{ id: number }",
      example: {
        id: 1
      }
    },
    response: {
      type: "Course[]",
      description: "Returns updated list of all courses including the new duplicate"
    }
  },
  {
    method: "GET",
    path: "/api/stocks",
    description: "Retrieve all stocks",
    response: {
      type: "Stock[]",
      example: [
        {
          id: 1,
          name: "Sun Pharma",
          full_name: "Sun Pharmaceutical Industries Ltd",
          industry: "Pharmaceuticals",
          description: "A leading Indian pharmaceutical company...",
          financial_details: {
            debt_to_assets_ratio: "Low",
            non_compliant_income_ratio: "Below 5%",
            market_cap: "424,476.57 cr"
          },
          performance: {
            stock_performance: "Consistently strong",
            growth_potential: "High"
          },
          about: "Founded in 1983...",
          stock_link: "https://www.sunpharma.com",
          price: "1,050.45",
          status: "+0.100 (0.10%) today",
          Share_Vest_Featured: true,
          fundamentals: {
            profitMargin: "15.2%",
            operatingMargin: "18.5%",
            returnOnEquity: "22.4%"
          }
        }
      ]
    }
  },
  {
    method: "POST",
    path: "/api/stocks",
    description: "Create a new stock",
    request: {
      type: "Partial<Stock>",
      example: {
        name: "New Stock",
        full_name: "New Stock Full Name",
        industry: "Technology",
        price: "100.00"
      }
    },
    response: {
      type: "Stock[]",
      description: "Returns updated list of all stocks"
    }
  },
  {
    method: "PUT",
    path: "/api/stocks",
    description: "Update an existing stock",
    request: {
      type: "Partial<Stock>",
      example: {
        id: 1,
        price: "105.50",
        status: "+5.50 (5.50%) today"
      }
    },
    response: {
      type: "Stock[]",
      description: "Returns updated list of all stocks"
    }
  },
  {
    method: "DELETE",
    path: "/api/stocks",
    description: "Delete a stock",
    request: {
      type: "{ id: number }",
      example: { id: 1 }
    },
    response: {
      type: "Stock[]",
      description: "Returns updated list of all stocks"
    }
  },
  {
    method: "POST",
    path: "/api/stocks/duplicate",
    description: "Duplicate an existing stock",
    request: {
      type: "{ id: number }",
      example: { id: 1 }
    },
    response: {
      type: "Stock[]",
      description: "Returns updated list of all stocks including the new duplicate"
    }
  }
];

const types = [
  {
    name: "Course",
    description: "Represents a course in the platform",
    properties: [
      { name: "id", type: "number", description: "Unique identifier" },
      { name: "name", type: "string", description: "Course name" },
      { name: "imageCode", type: "string", description: "Image reference code" },
      { name: "imageUrl", type: "string", description: "URL to course image" },
      { name: "category", type: "string", description: "Course category" },
      { name: "published", type: "boolean", description: "Publication status" },
      { name: "chapters", type: "Chapter[]", description: "List of chapters" }
    ]
  },
  {
    name: "Chapter",
    description: "Represents a chapter within a course",
    properties: [
      { name: "id", type: "number", description: "Unique identifier" },
      { name: "title", type: "string", description: "Chapter title" },
      { name: "videoUrl", type: "string", description: "URL to chapter video" }
    ]
  }
];

function CodeBlock({ code }: { code: any }) {
  return (
    <pre className="bg-muted/50 p-4 rounded-lg overflow-auto">
      <code className="text-sm font-mono">
        {JSON.stringify(code, null, 2)}
      </code>
    </pre>
  );
}

export default function DocsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"courses" | "stocks">("courses");

  const filteredEndpoints = endpoints.filter(endpoint => {
    const matchesSearch = 
      endpoint.path.toLowerCase().includes(search.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = endpoint.path.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-theme(spacing.16))]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">API Documentation</h1>
        <p className="text-muted-foreground">
          Complete reference for the ShareVest API
        </p>
      </div>

      <div className="grid grid-cols-5 gap-8 flex-1">
        {/* Sidebar */}
        <div className="col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search endpoints..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedCategory("courses")}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === "courses" 
                  ? "bg-accent text-accent-foreground" 
                  : "hover:bg-accent/50"
              }`}
            >
              Course Endpoints
            </button>
            <button
              onClick={() => setSelectedCategory("stocks")}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === "stocks" 
                  ? "bg-accent text-accent-foreground" 
                  : "hover:bg-accent/50"
              }`}
            >
              Stock Endpoints
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-4">
          <Tabs defaultValue="endpoints" className="h-full">
            <TabsList>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="types">Types</TabsTrigger>
            </TabsList>

            <TabsContent value="endpoints" className="space-y-6">
              {filteredEndpoints.map((endpoint) => (
                <Card key={`${endpoint.method}${endpoint.path}`} className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge 
                      variant={endpoint.method === 'GET' ? 'default' : 'secondary'}
                      className="w-16 justify-center"
                    >
                      {endpoint.method}
                    </Badge>
                    <code className="text-sm font-mono bg-muted px-2 py-1 rounded flex-1">
                      {endpoint.path}
                    </code>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {endpoint.description}
                  </p>

                  {endpoint.request && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">Request</Badge>
                        <span className="text-sm text-muted-foreground">
                          Type: {endpoint.request.type}
                        </span>
                      </div>
                      <CodeBlock code={endpoint.request.example} />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Response</Badge>
                      <span className="text-sm text-muted-foreground">
                        Type: {endpoint.response.type}
                        {endpoint.response.description && ` - ${endpoint.response.description}`}
                      </span>
                    </div>
                    {endpoint.response.example && (
                      <CodeBlock code={endpoint.response.example} />
                    )}
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="types">
              <div className="space-y-6">
                {types.map((type) => (
                  <Card key={type.name} className="p-6">
                    <h2 className="text-lg font-semibold mb-2">{type.name}</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      {type.description}
                    </p>

                    <div className="relative rounded-lg overflow-hidden border">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                          <tr className="text-left">
                            <th className="p-3 font-medium">Property</th>
                            <th className="p-3 font-medium">Type</th>
                            <th className="p-3 font-medium">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {type.properties.map((prop) => (
                            <tr key={prop.name} className="border-t">
                              <td className="p-3 font-mono">{prop.name}</td>
                              <td className="p-3 font-mono text-muted-foreground">
                                {prop.type}
                              </td>
                              <td className="p-3 text-muted-foreground">
                                {prop.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}