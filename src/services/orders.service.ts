import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order } from '../entities/order.entity'
import { CreateOrderDto } from '../dtos/create-order.dto'
import { PaymentsApi } from '../api/payments.api'

@Injectable()
export class OrdersService {
  public static readonly CREATED = 'created'
  public static readonly CONFIRMED = 'confirmed'
  public static readonly DELIVERED = 'delivered'
  public static readonly CANCELLED = 'cancelled'

  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    private paymentsApi: PaymentsApi
  ) {}

  async createOrder(order: CreateOrderDto) {
    const savedOrder = await this.ordersRepository.save({
      ...order,
      status: OrdersService.CREATED
    })
    this.verifyOrder(savedOrder)
  }

  private async verifyOrder(order: Order) {
    const verified = await this.paymentsApi.verifyPayment(order)

    if (verified.status === 'approved') {
      this.ordersRepository.update(order.id, {
        status: OrdersService.CONFIRMED
      })
      this.deliverOrder(order.id)
    }

    if (verified.status === 'declined') {
      this.ordersRepository.update(order.id, {
        status: OrdersService.CANCELLED
      })
    }
  }

  private deliverOrder(id) {
    setTimeout(() => {
      this.ordersRepository.update(id, {
        status: OrdersService.DELIVERED
      })
    }, 10000)
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
