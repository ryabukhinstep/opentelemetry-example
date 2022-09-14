import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenTelemetryModule } from 'nestjs-otel';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { Config } from "./config";
import { kafkaClientToken } from "./constants";

@Module({
  imports: [
    OpenTelemetryModule.forRoot({
    metrics: {
      hostMetrics: true, apiMetrics: {
        enable: true, ignoreUndefinedRoutes: true
      },
    },
  }),
    ClientsModule.register([{
    name: kafkaClientToken,
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: Config.kafkaClientId,
        brokers: [Config.kafkaBrokers]
      }
    }
  }
    ])], controllers: [AppController], providers: [AppService],
})
export class AppModule {

}
