import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityEntity } from './city.entity/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityController } from './city.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  providers: [CityService],
  controllers: [CityController]
})
export class CityModule {}
