import { Course } from '../types/course';

export const initialCourses: Course[] = [
  {
    id: 1,
    name: "Stock Market Basics",
    imageCode: "FINSsC9P50Y",
    imageUrl: "https://i.ytimg.com/vi/FINSsC9P50Y/maxresdefault.jpg",
    category: "Beginner",
    enrolled: true,
    chapters: [
      { id: 1, title: "Stock Market Terminology", videoUrl: "https://vimeo.com/271741409" },
      { id: 2, title: "Basics of Stock Investing", videoUrl: "https://vimeo.com/271741409" },
      { id: 3, title: "Understanding Market Trends", videoUrl: "https://vimeo.com/271741409" },
      { id: 4, title: "Types of Stocks", videoUrl: "https://vimeo.com/271741409" },
      { id: 5, title: "Risk Management in Stocks", videoUrl: "https://vimeo.com/271741409" },
      { id: 6, title: "Key Financial Metrics", videoUrl: "https://vimeo.com/271741409" },
      { id: 7, title: "How Stock Prices are Determined", videoUrl: "https://vimeo.com/271741409" },
      { id: 8, title: "Introduction to Stock Market", videoUrl: "https://vimeo.com/271741409" }
    ]
  },
  {
    id: 2,
    name: "Halal Investing Guide",
    imageCode: "jqY2URdUDso",
    imageUrl: "https://i.ytimg.com/vi/jqY2URdUDso/maxresdefault.jpg",
    category: "Portfolio",
    chapters: [
      { id: 1, title: "Screening Halal Stocks", videoUrl: "https://vimeo.com/271741409" },
      { id: 2, title: "Ethical Considerations in Investing", videoUrl: "https://vimeo.com/271741409" },
      { id: 3, title: "Halal Investment Options", videoUrl: "https://vimeo.com/271741409" },
      { id: 4, title: "Shariah Principles in Finance", videoUrl: "https://vimeo.com/271741409" },
      { id: 5, title: "Introduction to Halal Investing", videoUrl: "https://vimeo.com/271741409" },
      { id: 6, title: "Halal Mutual Funds and ETFs", videoUrl: "https://vimeo.com/271741409" },
      { id: 7, title: "Building a Halal Portfolio", videoUrl: "https://vimeo.com/271741409" },
      { id: 8, title: "Risk Management in Halal Investing", videoUrl: "https://vimeo.com/271741409" }
    ]
  }
];