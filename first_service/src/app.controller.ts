import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { OtelMethodCounter } from 'nestjs-otel';

class BodyDto {
  value: string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @OtelMethodCounter()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('hello/:id')
  @OtelMethodCounter({unit: "unit", description: "test testov"})
  async getHelloById(@Param("id") id: string): Promise<string> {
    return this.appService.getHello(id);
  }



  @Post('greeting')
  @OtelMethodCounter()
  async greeting(@Body() dto: BodyDto): Promise<string> {
    return this.appService.getHello(dto.value);
  }
}
