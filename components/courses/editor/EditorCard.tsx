"use client";

import { useState } from "react";
import { Course } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicInfoTab } from "./tabs/BasicInfoTab";
import { ChaptersTab } from "./tabs/ChaptersTab";
import { CustomFieldsTab } from "./tabs/CustomFieldsTab";
import { EditorHeader } from "./EditorHeader";
import { useForm, FormProvider } from "react-hook-form";

interface EditorCardProps {
  course?: Course;
  onSubmit: (course: Partial<Course>) => void;
}

export function EditorCard({ course, onSubmit }: EditorCardProps) {
  const [activeTab, setActiveTab] = useState("basic");
  
  const methods = useForm({
    defaultValues: {
      name: course?.name || "",
      category: course?.category || "",
      imageUrl: course?.imageUrl || "",
      imageCode: course?.imageCode || "",
      chapters: course?.chapters || [],
      customFields: course?.customFields || []
    }
  });

  const handleSubmit = methods.handleSubmit((data) => {
    onSubmit({
      ...data,
      id: course?.id
    });
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <EditorHeader isEdit={!!course} />
        
        <Card className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="chapters">Chapters</TabsTrigger>
              <TabsTrigger value="custom">Custom Fields</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <BasicInfoTab />
            </TabsContent>

            <TabsContent value="chapters" className="space-y-6">
              <ChaptersTab />
            </TabsContent>

            <TabsContent value="custom" className="space-y-6">
              <CustomFieldsTab />
            </TabsContent>
          </Tabs>
        </Card>
      </form>
    </FormProvider>
  );
}