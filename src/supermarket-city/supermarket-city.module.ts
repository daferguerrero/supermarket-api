import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupermarketEntity } from 'src/supermarket/supermarket.entity/supermarket.entity';
import { SupermarketService } from 'src/supermarket/supermarket.service';
import { SupermarketCityController } from './supermarket-city.controller';
import { CityEntity } from 'src/city/city.entity/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupermarketEntity, CityEntity])],
  providers: [SupermarketService],
  controllers: [SupermarketCityController],
})
export class SupermarketCityModule {}
