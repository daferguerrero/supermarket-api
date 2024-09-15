import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityEntity } from './city.entity/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  providers: [CityService]
})
export class CityModule {}
