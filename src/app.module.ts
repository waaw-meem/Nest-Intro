import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [ProductModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
