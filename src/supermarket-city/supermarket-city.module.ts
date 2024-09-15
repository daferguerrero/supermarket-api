import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupermarketEntity } from 'src/supermarket/supermarket.entity/supermarket.entity';
import { SupermarketService } from 'src/supermarket/supermarket.service';
import { SupermarketCityController } from './supermarket-city.controller';


@Module({
  imports: [TypeOrmModule.forFeature([SupermarketEntity])],
  providers: [SupermarketService],
  controllers: [SupermarketCityController],
})
export class SupermarketCityModule {}
