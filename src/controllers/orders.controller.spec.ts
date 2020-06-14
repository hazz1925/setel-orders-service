import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from '../services/orders.service';

describe('OrdersController', () => {
  let ordersController: OrdersController;
  let ordersServiceMock = {
    createOrder: () => {},
    get: () => {},
    cancelOrder: () => {}
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{
        provide: OrdersService,
        useValue: ordersServiceMock
      }],
    }).compile();

    ordersController = app.get<OrdersController>(OrdersController);
  });

  describe('create', () => {
    it('should create order successfully', async () => {
      const created = await ordersController.create({ name: 'Test Order' })
      expect(created.message).toBe('Success');
    });

    it('should fail if error thrown', async () => {
      ordersServiceMock.createOrder = () => {
        throw new Error('some error')
      }
      const created = await ordersController.create({ name: 'Test Order' })
      expect(created.error).toBe('some error');
    });
  });

  describe('status', () => {
    it('should get status successfully', async () => {
      ordersServiceMock.get = () => ({ id: 1, name: 'test', status: 'created' })
      const res = await ordersController.status({ id: 1 })
      expect(res.status).toBe('created');
    });
  });

  describe('cancel', () => {
    it('should cancel successfully', async () => {
      const cancelled = await ordersController.cancel({ id: 1 })
      expect(cancelled.message).toBe('Success');
    });

    it('should fail if error thrown', async () => {
      ordersServiceMock.cancelOrder = () => {
        throw new Error('some error')
      }
      const cancelled = await ordersController.cancel({ id: 1 })
      expect(cancelled.error).toBe('some error');
    });
  });
});
