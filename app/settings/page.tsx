"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface OrganizationSettings {
  name: string;
  website: string;
  supportEmail: string;
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<OrganizationSettings>({
    name: "ShareVest",
    website: "https://sharevest.com",
    supportEmail: "support@sharevest.com"
  });

  const handleSettingChange = (key: keyof OrganizationSettings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Here you would typically make an API call to save the settings
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1">Settings</h1>
      <p className="text-muted-foreground mb-8">
        Configure your platform settings
      </p>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Organization Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your organization details
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input 
                  id="orgName" 
                  value={settings.name}
                  onChange={(e) => handleSettingChange('name', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input 
                  id="website" 
                  type="url" 
                  value={settings.website}
                  onChange={(e) => handleSettingChange('website', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input 
                  id="supportEmail" 
                  type="email" 
                  value={settings.supportEmail}
                  onChange={(e) => handleSettingChange('supportEmail', e.target.value)}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Palette className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Appearance Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Customize the look and feel
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label>Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
} 