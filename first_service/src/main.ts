import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import otelSDK from './tracing';
import { Config } from "./config";
import { Logger, PinoLogger } from "nestjs-pino";
import { loggerOptions } from "./loggerOptions";

async function bootstrap() {
  await otelSDK.start();
  const logger = new Logger(new PinoLogger({ ...loggerOptions }), { renameContext: "Nest" });

  const app = await NestFactory.create(AppModule, { logger });
  await app.listen(Config.port);
}
bootstrap();
