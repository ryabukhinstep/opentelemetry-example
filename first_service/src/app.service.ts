import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PinoLogger } from "nestjs-pino";
import { Config } from "./config";

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService, private readonly logger: PinoLogger) {}

  async getHello(greeting = 'Hello'): Promise<string> {

    this.logger.info({msg: "Hello method", data: { message: greeting }})

    const { data } = await this.httpService
      .get("/world", { baseURL: Config.second_service_api_url})
      .toPromise();
    return `${greeting} ${data}`;
  }
}
