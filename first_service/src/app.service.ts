import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService, private readonly logger: PinoLogger) {}

  async getHello(greeting = 'Hello'): Promise<string> {

    this.logger.info({msg: "Hello method", data: { message: greeting }})

    const { data } = await this.httpService
      .get('http://localhost:4000/world')
      .toPromise();
    return `${greeting} ${data}`;
  }
}
