export interface Chapter {
  id: number;
  title: string;
  videoUrl: string;
}

export interface CustomField {
  key: string;
  value: string;
}

export interface CourseData {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  imageCode: string;
  chapters: Chapter[];
  customFields?: CustomField[];
  enrolled: boolean;
}

export type Course = Omit<CourseData, 'enrolled'> & {
  enrolled?: boolean;
};

export interface FormData extends Omit<Course, 'id'> {
  id?: number;
}