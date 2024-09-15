import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { SupermarketCityService } from './supermarket-city.service';
import { SupermarketEntity } from '../supermarket/supermarket.entity/supermarket.entity';

@Controller('supermarket-city')
@Controller('cities/:cityId/supermarkets')
@UseInterceptors(BusinessErrorsInterceptor)
export class SupermarketCityController {

  constructor(private readonly supermarketCityService: SupermarketCityService) {}

  @Post(':supermarketId')
  async addSupermarketToCity(
    @Param('cityId') cityId: string,
    @Param('supermarketId') supermarketId: string
  ) {
    return await this.supermarketCityService.addSupermarketToCity(cityId, supermarketId);
  }

  @Get()
  async findSupermarketsFromCity(@Param('cityId') cityId: string) {
    return await this.supermarketCityService.findSupermarketsFromCity(cityId);
  }

  @Get(':supermarketId')
  async findSupermarketFromCity(
    @Param('cityId') cityId: string,
    @Param('supermarketId') supermarketId: string
  ) {
    return await this.supermarketCityService.findSupermarketFromCity(cityId, supermarketId);
  }

  @Put()
  async updateSupermarketsFromCity(
    @Body() supermarkets: SupermarketEntity[],
    @Param('cityId') cityId: string
  ) {
    return await this.supermarketCityService.updateSupermarketsFromCity(cityId, supermarkets);
  }

  @Delete(':supermarketId')
  @HttpCode(204)
  async deleteSupermarketFromCity(
    @Param('cityId') cityId: string,
    @Param('supermarketId') supermarketId: string
  ) {
    return await this.supermarketCityService.deleteSupermarketFromCity(cityId, supermarketId);
  }
}
