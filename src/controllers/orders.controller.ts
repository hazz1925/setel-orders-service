import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dtos/create-order.dto'

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Response {
    try {
      this.ordersService.createOrder(createOrderDto)
    } catch (error) {
      return { error: error.message }
    }
    return { message: 'Success' }
  }

  @Get('/status/:id')
  async status(@Param() params) {
    const order = await this.ordersService.get(params.id)
    return {
      status: order.status
    }
  }

  @Delete(':id')
  cancel(@Param() params): Response {
    try {
      this.ordersService.cancelOrder(params.id)
    } catch (error) {
      return { error: error.message }
    }
    return { message: 'Success' }
  }
}

interface Response {
  message?: string
  error?: string
}
