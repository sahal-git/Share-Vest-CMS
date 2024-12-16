import { Course } from './types';

export const courses: Course[] = [
  {
    id: 1,
    name: "Stock Market Basics",
    imageCode: "FINSsC9P50Y",
    published: true,
    intro: true,
    imageUrl: "https://i.ytimg.com/vi/FINSsC9P50Y/maxresdefault.jpg",
    category: "Beginner",
    chapters: [
      { id: 1, title: "Stock Market Terminology", videoUrl: "https://vimeo.com/271741409" },
      { id: 2, title: "Basics of Stock Investing", videoUrl: "https://vimeo.com/271741409" }
    ]
  },
  {
    id: 2,
    name: "Technical Analysis",
    imageCode: "Y3kzzE9Elns",
    published: true,
    intro: false,
    imageUrl: "https://i.ytimg.com/vi/Y3kzzE9Elns/maxresdefault.jpg",
    category: "Intermediate",
    chapters: [
      { id: 1, title: "Chart Patterns", videoUrl: "https://vimeo.com/271741409" },
      { id: 2, title: "Technical Indicators", videoUrl: "https://vimeo.com/271741409" }
    ]
  },
  {
    id: 3,
    name: "Advanced Stock Trading",
    imageCode: "Y3kzzE9Elns",
    published: true,
    intro: false,
    imageUrl: "https://i.ytimg.com/vi/Y3kzzE9Elns/maxresdefault.jpg",
    category: "Advanced",
    chapters: [
      { id: 1, title: "Stock Valuation Models", videoUrl: "https://vimeo.com/271741409" },
      { id: 2, title: "Global Market Impact on Stocks", videoUrl: "https://vimeo.com/271741409" },
      { id: 3, title: "Risk Management Strategies", videoUrl: "https://vimeo.com/271741409" }
    ]
  }
];