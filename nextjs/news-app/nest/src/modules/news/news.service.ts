import { Injectable, NotFoundException } from '@nestjs/common';

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface News {
  id: string;
  title: string;
  description: string;
  categoryId: number;
}

@Injectable()
export class NewsService {
  categories: Category[] = [
    { id: 1, slug: 'local', name: 'Local' },
    { id: 2, slug: 'national', name: 'National' },
    { id: 3, slug: 'international', name: 'International' },
    { id: 4, slug: 'business', name: 'Business' },
    { id: 5, slug: 'sports', name: 'Sports' },
    { id: 6, slug: 'weather', name: 'Weather' },
    { id: 7, slug: 'entertainment', name: 'Entertainment' },
  ];

  news: News[] = [
    {
      id: '1',
      title: 'Local News 1',
      description: 'Description of Local News 1',
      categoryId: 1,
    },
    {
      id: '2',
      title: 'National News 1',
      description: 'Description of National News 1',
      categoryId: 2,
    },
    {
      id: '3',
      title: 'International News 1',
      description: 'Description of International News 1',
      categoryId: 3,
    },
    {
      id: '4',
      title: 'Business News 1',
      description: 'Description of Business News 1',
      categoryId: 4,
    },
    {
      id: '5',
      title: 'Sports News 1',
      description: 'Description of Sports News 1',
      categoryId: 5,
    },
    {
      id: '6',
      title: 'Weather News 1',
      description: 'Description of Weather News 1',
      categoryId: 6,
    },
    {
      id: '7',
      title: 'Entertainment News 1',
      description: 'Description of Entertainment News 1',
      categoryId: 7,
    },
  ];

  getAll() {
    return this.categories;
  }

  getNewsofCategory(slug: string) {
    const category = this.categories.find((cat) => cat.slug === slug);
    if (!category) throw new NotFoundException('category not found');
    const news = this.news.filter((n) => n.categoryId === category.id);
    return news;
  }
}
