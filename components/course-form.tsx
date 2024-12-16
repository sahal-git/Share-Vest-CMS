"use client";

import { useState } from "react";
import { Course, Chapter } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Trash2 } from "lucide-react";

interface CourseFormProps {
  course?: Course;
  onSubmit: (course: Partial<Course>) => void;
}

export function CourseForm({ course, onSubmit }: CourseFormProps) {
  const [formData, setFormData] = useState<Partial<Course>>(course || {
    name: "",
    imageCode: "",
    imageUrl: "",
    category: "",
    published: false,
    chapters: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addChapter = () => {
    setFormData({
      ...formData,
      chapters: [
        ...(formData.chapters || []),
        {
          id: Date.now(),
          title: "",
          videoUrl: ""
        }
      ]
    });
  };

  const updateChapter = (index: number, field: keyof Chapter, value: string) => {
    const updatedChapters = [...(formData.chapters || [])];
    updatedChapters[index] = {
      ...updatedChapters[index],
      [field]: value
    };
    setFormData({
      ...formData,
      chapters: updatedChapters
    });
  };

  const removeChapter = (index: number) => {
    const updatedChapters = [...(formData.chapters || [])];
    updatedChapters.splice(index, 1);
    setFormData({
      ...formData,
      chapters: updatedChapters
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-h-[80vh]">
      <Tabs defaultValue="basic" className="flex-1 flex flex-col min-h-0">
        <TabsList className="w-full grid grid-cols-3 px-4 py-2">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="chapters">Chapters</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-[calc(80vh-8rem)]">
            <div className="px-4 py-6">
              <TabsContent value="basic" className="space-y-4 mt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Course Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between border rounded-lg p-4 bg-muted/10">
                  <div className="space-y-0.5">
                    <Label>Publication Status</Label>
                    <p className="text-sm text-muted-foreground">
                      {formData.published 
                        ? "This course is live and visible to users" 
                        : "This course is currently in draft mode"
                      }
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant={formData.published ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData({ ...formData, published: !formData.published })}
                    className="min-w-[100px]"
                  >
                    {formData.published ? "Published" : "Draft"}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="chapters" className="mt-0">
                <Card className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Course Chapters</h3>
                    <Button type="button" onClick={addChapter} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Chapter
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {formData.chapters?.map((chapter, index) => (
                      <Card key={chapter.id} className="p-4">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1 space-y-4">
                            <div>
                              <Label>Chapter Title</Label>
                              <Input
                                value={chapter.title}
                                onChange={(e) => updateChapter(index, 'title', e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <Label>Video URL</Label>
                              <Input
                                value={chapter.videoUrl}
                                onChange={(e) => updateChapter(index, 'videoUrl', e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="text-destructive"
                            onClick={() => removeChapter(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}

                    {formData.chapters?.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No chapters added yet. Click "Add Chapter" to get started.
                      </p>
                    )}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="media" className="mt-0">
                <Card className="p-4 space-y-4">
                  <div>
                    <Label htmlFor="imageCode">Image Code</Label>
                    <Input
                      id="imageCode"
                      value={formData.imageCode}
                      onChange={(e) => setFormData({ ...formData, imageCode: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      required
                    />
                  </div>
                  {formData.imageUrl && (
                    <div className="mt-4">
                      <Label>Preview</Label>
                      <div className="relative h-48 mt-2 rounded-lg overflow-hidden border">
                        <img
                          src={formData.imageUrl}
                          alt="Course preview"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  )}
                </Card>
              </TabsContent>
            </div>
          </ScrollArea>
        </div>
      </Tabs>

      <div className="flex justify-end p-4 border-t bg-background mt-auto">
        <Button type="submit">
          {course ? "Update Course" : "Create Course"}
        </Button>
      </div>
    </form>
  );
}