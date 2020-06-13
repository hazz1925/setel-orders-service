import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { Order } from './entities/order.entity'


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'orderapp',
      password: 'password',
      database: 'setel',
      entities: [ Order ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ Order ])
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class AppModule {}
