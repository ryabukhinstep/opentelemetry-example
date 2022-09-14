import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import otelSDK from './tracing';
import { Config } from "./config";

async function bootstrap() {
  await otelSDK.start();
  const app = await NestFactory.create(AppModule);
  await app.listen(Config.port);
}
bootstrap();
