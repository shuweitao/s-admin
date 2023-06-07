import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { JwtStrategy } from "@/auth/strategy/jwt.strategy";

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, JwtStrategy]
})
export class CategoryModule {
}
