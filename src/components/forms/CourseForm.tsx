import React, { useState } from 'react';
import { Course, Chapter } from '../../types/course';
import { PlusCircle, MinusCircle } from 'lucide-react';

interface CourseFormProps {
  onSubmit: (course: Omit<Course, 'id'>) => void;
  initialData?: Partial<Course>;
}

export function CourseForm({ onSubmit, initialData }: CourseFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    imageCode: initialData?.imageCode || '',
    imageUrl: initialData?.imageUrl || '',
    category: initialData?.category || 'Beginner',
    chapters: initialData?.chapters || [{ id: 1, title: '', videoUrl: '' }]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleChapterChange = (index: number, field: keyof Chapter, value: string) => {
    setFormData(prev => ({
      ...prev,
      chapters: prev.chapters.map((chapter, i) => 
        i === index ? { ...chapter, [field]: value } : chapter
      )
    }));
  };

  const addChapter = () => {
    setFormData(prev => ({
      ...prev,
      chapters: [...prev.chapters, { 
        id: prev.chapters.length + 1, 
        title: '', 
        videoUrl: '' 
      }]
    }));
  };

  const removeChapter = (index: number) => {
    setFormData(prev => ({
      ...prev,
      chapters: prev.chapters.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Course Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image Code</label>
          <input
            type="text"
            name="imageCode"
            value={formData.imageCode}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Beginner">Beginner</option>
            <option value="Advanced">Advanced</option>
            <option value="Portfolio">Portfolio</option>
            <option value="Trading">Trading</option>
            <option value="Screening">Screening</option>
          </select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Chapters</label>
            <button
              type="button"
              onClick={addChapter}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
            >
              <PlusCircle className="w-4 h-4 mr-1" />
              Add Chapter
            </button>
          </div>

          {formData.chapters.map((chapter, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={chapter.title}
                  onChange={(e) => handleChapterChange(index, 'title', e.target.value)}
                  placeholder="Chapter Title"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <input
                  type="url"
                  value={chapter.videoUrl}
                  onChange={(e) => handleChapterChange(index, 'videoUrl', e.target.value)}
                  placeholder="Video URL"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              {formData.chapters.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeChapter(index)}
                  className="mt-2 text-red-600 hover:text-red-500"
                >
                  <MinusCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
}