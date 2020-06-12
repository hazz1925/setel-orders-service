import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from '../services/app.service';

export class CreateOrderDto {
  name: string
}

@Controller('orders')
export class OrdersController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): string {
    return createOrderDto.name
  }
}
