import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
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

  @Delete(':id')
  cancel(@Param() params) {
    try {
      this.ordersService.cancelOrder(params.id)
    } catch (error) {
      return { error }
    }
    return { msg: 'Success' }
  }
}
