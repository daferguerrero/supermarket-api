import { Module } from '@nestjs/common';
import { SupermarketService } from './supermarket.service';
import { SupermarketController } from './supermarket.controller';
import { SupermarketEntity } from './supermarket.entity/supermarket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from 'src/city/city.entity/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupermarketEntity])],
  providers: [SupermarketService],
  controllers: [SupermarketController]
})
export class SupermarketModule {}