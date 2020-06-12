import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [AppService],
})
export class AppModule {}
