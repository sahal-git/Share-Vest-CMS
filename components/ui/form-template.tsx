"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define your form data interface
interface FormData {
  // Basic Info
  title: string;
  subtitle: string;
  description: string;
  category: string;

  // Details
  details: {
    field1: string;
    field2: string;
    field3: string;
  };

  // Metrics
  metrics: {
    metric1: string;
    metric2: string;
    metric3: string;
  };

  // Settings
  settings: {
    setting1: boolean;
    setting2: string;
    setting3: number;
  };
}

interface FormTemplateProps {
  initialData?: Partial<FormData>;
  onSubmit: (data: FormData) => void;
  isEditing?: boolean;
}

export function FormTemplate({ initialData, onSubmit, isEditing = false }: FormTemplateProps) {
  const [formData, setFormData] = useState<FormData>({
    // Basic Info
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    description: initialData?.description || "",
    category: initialData?.category || "",

    // Details
    details: {
      field1: initialData?.details?.field1 || "",
      field2: initialData?.details?.field2 || "",
      field3: initialData?.details?.field3 || "",
    },

    // Metrics
    metrics: {
      metric1: initialData?.metrics?.metric1 || "0",
      metric2: initialData?.metrics?.metric2 || "0",
      metric3: initialData?.metrics?.metric3 || "0",
    },

    // Settings
    settings: {
      setting1: initialData?.settings?.setting1 || false,
      setting2: initialData?.settings?.setting2 || "",
      setting3: initialData?.settings?.setting3 || 0,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateDetails = (key: keyof FormData['details'], value: string) => {
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        [key]: value
      }
    });
  };

  const updateMetrics = (key: keyof FormData['metrics'], value: string) => {
    setFormData({
      ...formData,
      metrics: {
        ...formData.metrics,
        [key]: value
      }
    });
  };

  const updateSettings = (key: keyof FormData['settings'], value: any) => {
    setFormData({
      ...formData,
      settings: {
        ...formData.settings,
        [key]: value
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              />
            </div>
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
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="category1">Category 1</SelectItem>
                <SelectItem value="category2">Category 2</SelectItem>
                <SelectItem value="category3">Category 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="details" className="mt-4">
          <Card className="p-4 space-y-4">
            <div>
              <Label>Field 1</Label>
              <Input
                value={formData.details.field1}
                onChange={(e) => updateDetails('field1', e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Field 2</Label>
              <Input
                value={formData.details.field2}
                onChange={(e) => updateDetails('field2', e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Field 3</Label>
              <Input
                value={formData.details.field3}
                onChange={(e) => updateDetails('field3', e.target.value)}
                required
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="mt-4">
          <Card className="p-4 space-y-4">
            <div>
              <Label>Metric 1</Label>
              <Input
                type="number"
                value={formData.metrics.metric1}
                onChange={(e) => updateMetrics('metric1', e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Metric 2</Label>
              <Input
                type="number"
                value={formData.metrics.metric2}
                onChange={(e) => updateMetrics('metric2', e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Metric 3</Label>
              <Input
                type="number"
                value={formData.metrics.metric3}
                onChange={(e) => updateMetrics('metric3', e.target.value)}
                required
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <Card className="p-4 grid gap-4">
            <div>
              <Label>Setting 1</Label>
              <Select
                value={formData.settings.setting1.toString()}
                onValueChange={(value) => updateSettings('setting1', value === 'true')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Enabled</SelectItem>
                  <SelectItem value="false">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Setting 2</Label>
              <Input
                value={formData.settings.setting2}
                onChange={(e) => updateSettings('setting2', e.target.value)}
              />
            </div>
            <div>
              <Label>Setting 3</Label>
              <Input
                type="number"
                value={formData.settings.setting3}
                onChange={(e) => updateSettings('setting3', parseInt(e.target.value))}
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button type="submit">
          {isEditing ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
} 