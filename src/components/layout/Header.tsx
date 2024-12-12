import React from 'react';
import { Plus } from 'lucide-react';

interface HeaderProps {
  onAddClick: () => void;
  isEditing: boolean;
}

export function Header({ onAddClick, isEditing }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Course Management
        </h1>
        <p className="text-gray-500 mt-1">Manage your course catalog</p>
      </div>
      {!isEditing && (
        <button
          onClick={onAddClick}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Course
        </button>
      )}
    </div>
  );
}