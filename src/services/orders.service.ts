import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order } from '../entities/order.entity'
import { CreateOrderDto } from '../dtos/create-order.dto'

@Injectable()
export class OrdersService {
  public static readonly CREATED = 'created'
  public static readonly CONFIRMED = 'confirmed'
  public static readonly DELIVERED = 'delivered'
  public static readonly CANCELLED = 'cancelled'

  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>
  ) {}

  createOrder(order: CreateOrderDto) {
    this.ordersRepository.save({
      ...order,
      status: OrdersService.CREATED
    })
    // TODO: trigger payments app
  }

  get(id: number): Promise<Order> {
    try {
      return this.ordersRepository.findOne(id)
    } catch (error) {
      throw new NotFoundException()
    }
  }

  cancelOrder(id: number) {
    this.ordersRepository.update(id, {
      status: OrdersService.CANCELLED
    })
  }
}
