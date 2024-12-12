import React from 'react';
import { useForm } from 'react-hook-form';
import { Course } from '../types/course';
import { PlusCircle, MinusCircle } from 'lucide-react';

interface CourseFormProps {
  onSubmit: (data: Partial<Course>) => void;
  initialData?: Course;
}

export function CourseForm({ onSubmit, initialData }: CourseFormProps) {
  const { register, handleSubmit, watch, setValue } = useForm<Course>({
    defaultValues: initialData || {
      chapters: [{ id: 1, title: '', videoUrl: '' }]
    }
  });

  const chapters = watch('chapters') || [];

  const addChapter = () => {
    setValue('chapters', [...chapters, { id: chapters.length + 1, title: '', videoUrl: '' }]);
  };

  const removeChapter = (index: number) => {
    setValue('chapters', chapters.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Course Name</label>
        <input
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image Code</label>
        <input
          {...register('imageCode')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          {...register('imageUrl')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          {...register('category')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('published')}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label className="ml-2 text-sm text-gray-700">Published</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('intro')}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label className="ml-2 text-sm text-gray-700">Intro Course</label>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Chapters</h3>
          <button
            type="button"
            onClick={addChapter}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Chapter
          </button>
        </div>

        {chapters.map((chapter, index) => (
          <div key={index} className="flex space-x-4">
            <div className="flex-1">
              <input
                {...register(`chapters.${index}.title`)}
                placeholder="Chapter Title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex-1">
              <input
                {...register(`chapters.${index}.videoUrl`)}
                placeholder="Video URL"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button
              type="button"
              onClick={() => removeChapter(index)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              <MinusCircle className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Course
        </button>
      </div>
    </form>
  );
}