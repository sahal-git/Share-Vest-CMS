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
  imageCode: string;
  imageUrl: string;
  category: string;
  enrolled?: boolean;
  chapters: Chapter[];
  customFields?: CustomField[];
}