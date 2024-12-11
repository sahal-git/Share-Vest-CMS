export interface Chapter {
  id: number;
  title: string;
  videoUrl: string;
}

export interface CustomField {
  key: string;
  value: string;
}

export interface Course {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  imageCode: string;
  chapters: Chapter[];
  customFields?: CustomField[];
}

export interface FormData extends Omit<Course, 'id'> {
  id?: number;
}