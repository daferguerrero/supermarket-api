import { Module } from '@nestjs/common';
import { SupermarketService } from './supermarket.service';
import { SupermarketController } from './supermarket.controller';

@Module({
  providers: [SupermarketService],
  controllers: [SupermarketController]
})
export class SupermarketModule {}
