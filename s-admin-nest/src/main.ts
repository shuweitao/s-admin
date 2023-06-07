import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Validate from "./comnon/validate";
import { TransformInterceptor } from "@/transform.interceptor";
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useGlobalPipes(new ValidationPipe()) // 系统自带的参数校验管道
  app.useGlobalPipes(new Validate()) // 自定义参数校验管道
  app.useGlobalInterceptors(new TransformInterceptor())
  app.setGlobalPrefix('api') // 这是接口访问路径前缀（域名 + '/api/' + 接口名）
  app.useStaticAssets('uploads', { prefix: '/uploads' })
  await app.listen(3000);
}

bootstrap();
