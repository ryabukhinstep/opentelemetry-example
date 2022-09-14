import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from "@nestjs/microservices";
import { Config } from "./config"


@Controller()
export class AppController {

  @MessagePattern(Config.topic)
  readMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const response =
      `Receiving a new message from topic:${Config.topic}: ` +
      JSON.stringify(originalMessage.value);
    console.log(response);
    return response;
  }
}
