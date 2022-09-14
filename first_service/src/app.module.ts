import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenTelemetryModule } from 'nestjs-otel';
import { HttpModule } from "@nestjs/axios";
import { LoggerModule } from "nestjs-pino";
import { loggerOptions } from "./loggerOptions";

@Module({
  imports: [
    HttpModule,
    OpenTelemetryModule.forRoot({
      metrics: {
        hostMetrics: true,
        apiMetrics: {
          enable: true,
          //ignoreUndefinedRoutes: true
        },
      },
    }),
    LoggerModule.forRoot({ ...loggerOptions }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
