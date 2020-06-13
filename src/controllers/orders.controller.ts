import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dtos/create-order.dto'

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): object {
    try {
      this.ordersService.createOrder(createOrderDto)
    } catch (error) {
      return { error }
    }
    return { msg: 'Success' }
  }
}
