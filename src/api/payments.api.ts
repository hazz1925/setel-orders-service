import axios from 'axios'
import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity'

@Injectable()
export class PaymentsApi {
  async verifyPayment(order: Order): Promise<{ status: string }> {
    const res = await axios.post('http://localhost:3001/payments/verify', order)
    return res.data
  }
}
