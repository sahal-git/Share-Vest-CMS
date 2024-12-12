export interface Chapter {
  id: number;
  title: string;
  videoUrl: string;
}

export interface Course {
  id: number;
  name: string;
  imageCode: string;
  published: boolean;
  intro: boolean;
  imageUrl: string;
  category: string;
  chapters: Chapter[];
} 