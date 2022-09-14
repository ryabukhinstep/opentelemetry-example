import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import otelSDK from './tracing';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { Config } from "./config";

async function bootstrap() {
  await otelSDK.start();
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: Config.serviceName,
        brokers: [Config.kafkaBrokers]
      },
      consumer: {
        groupId: Config.groupId,
        allowAutoTopicCreation: true
      },
    }
  })
  await app.startAllMicroservices();
  await app.listen(Config.port)
}
bootstrap();
