'use client';

import { useState } from 'react';
import { Course, Chapter } from '@/types/course';
import { X } from 'lucide-react';

interface CourseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Course>) => void;
  course?: Course;
}

export function CourseDialog({ isOpen, onClose, onSubmit, course }: CourseDialogProps) {
  const [formData, setFormData] = useState<Partial<Course>>(
    course || {
      name: '',
      imageCode: '',
      imageUrl: '',
      published: false,
      intro: false,
      category: '',
      chapters: []
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChapterChange = (index: number, field: keyof Chapter, value: string) => {
    const newChapters = [...(formData.chapters || [])];
    newChapters[index] = {
      ...newChapters[index],
      [field]: value
    };
    setFormData({ ...formData, chapters: newChapters });
  };

  const addChapter = () => {
    setFormData({
      ...formData,
      chapters: [
        ...(formData.chapters || []),
        { id: Math.random(), title: '', videoUrl: '' }
      ]
    });
  };

  const removeChapter = (index: number) => {
    const newChapters = [...(formData.chapters || [])];
    newChapters.splice(index, 1);
    setFormData({ ...formData, chapters: newChapters });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {course ? 'Edit Course' : 'Create Course'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Image Code</label>
                <input
                  type="text"
                  value={formData.imageCode || ''}
                  onChange={(e) => setFormData({ ...formData, imageCode: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={formData.imageUrl || ''}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.published || false}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Published</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.intro || false}
                  onChange={(e) => setFormData({ ...formData, intro: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Intro Course</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">Chapters</label>
                <button
                  type="button"
                  onClick={addChapter}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Add Chapter
                </button>
              </div>
              <div className="space-y-4">
                {formData.chapters?.map((chapter, index) => (
                  <div key={chapter.id} className="flex space-x-4">
                    <input
                      type="text"
                      value={chapter.title}
                      onChange={(e) => handleChapterChange(index, 'title', e.target.value)}
                      placeholder="Chapter title"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={chapter.videoUrl}
                      onChange={(e) => handleChapterChange(index, 'videoUrl', e.target.value)}
                      placeholder="Video URL"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeChapter(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                {course ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 