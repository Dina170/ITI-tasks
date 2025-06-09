import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './modules/news/news.modules';

@Module({
  imports: [NewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
