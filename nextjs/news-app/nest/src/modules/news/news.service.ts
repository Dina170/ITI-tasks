import { Injectable, NotFoundException } from '@nestjs/common';

export interface Category {
  name: string;
  slug: string;
}

@Injectable()
export class NewsService {
  categories: Category[] = [
    { slug: 'local', name: 'Local' },
    { slug: 'national', name: 'National' },
    { slug: 'international', name: 'International' },
    { slug: 'business', name: 'Business' },
    { slug: 'sports', name: 'Sports' },
    { slug: 'weather', name: 'Weather' },
    { slug: 'entertainment', name: 'Entertainment' },
  ];

  getAll() {
    return this.categories;
  }

  getCategoryBySlug(slug: string) {
    const category = this.categories.find((cat) => cat.slug === slug);
    if (!category) throw new NotFoundException('category not found');
    return category;
  }
}
