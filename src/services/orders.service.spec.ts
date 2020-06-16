import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PaymentsApi } from '../api/payments.api'
import { Repository } from 'typeorm'

describe('OrdersService', () => {
  let ordersService: OrdersService;
  const ordersRepoMock = {
    save: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn()
  }
  const paymentsApiMock = {
    verifyPayment: jest.fn()
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: 'OrderRepository',
          useValue: ordersRepoMock
        },
        {
          provide: PaymentsApi,
          useValue: paymentsApiMock
        },
      ],
    }).compile();

    ordersService = app.get<OrdersService>(OrdersService);
  });

  describe('create order', () => {
    it('should create order successfully', async () => {
      const createOrder = {
        name: 'Test Order',
        status: OrdersService.CREATED
      }
      const order = {
        id: 1,
        name: 'Test Order',
        status: 'created'
      }
      ordersRepoMock.save.mockResolvedValue(order)
      paymentsApiMock.verifyPayment.mockResolvedValue({ status: 'declined' })
      const res = await ordersService.createOrder({ name: 'Test Order' })

      expect(ordersRepoMock.save).toHaveBeenCalledWith(createOrder);
      expect(paymentsApiMock.verifyPayment).toHaveBeenCalledWith(order);
    });
  });

  describe('get order', () => {
    it('should get order successfully', async () => {
      const order = {
        id: 1,
        name: 'Test Order',
        status: 'created'
      }
      ordersRepoMock.findOne.mockResolvedValue(order)

      const res = await ordersService.get(order.id)
      expect(res).toEqual(order)
    });

  });

  describe('cancel order', () => {
    it('should cancel order successfully', async () => {
      const order = {
        id: 1,
        name: 'Test Order',
        status: 'created'
      }
      const res = await ordersService.cancelOrder(order.id)

      expect(ordersRepoMock.update).toHaveBeenCalledWith(
        order.id,
        { status: OrdersService.CANCELLED }
      );
    });

  });
})
