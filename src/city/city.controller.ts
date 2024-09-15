import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { CityService } from './city.service';
import { CityEntity } from './city.entity/city.entity';

@Controller('cities')
@UseInterceptors(BusinessErrorsInterceptor)
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async findAll() {
    return await this.cityService.findAll();
  }

  @Get(':cityId')
  async findOne(@Param('cityId') cityId: string) {
    return await this.cityService.findOne(cityId);
  }

  @Post()
  async create(@Body() city: CityEntity) {
    return await this.cityService.create(city);
  }

  @Put(':cityId')
  async update(@Param('cityId') cityId: string, @Body() city: CityEntity) {
    return await this.cityService.update(cityId, city);
  }

  @Delete(':cityId')
  @HttpCode(204)
  async delete(@Param('cityId') cityId: string) {
    return await this.cityService.delete(cityId);
  }
}
