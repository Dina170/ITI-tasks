import { Controller, Get, Param } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('categories')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get()
  getCategories() {
    return this.newsService.getCategories();
  }

  @Get(':slug')
  getNewsByCategory(@Param('slug') slug: string) {
    return this.newsService.getNewsofCategory(slug);
  }
}
