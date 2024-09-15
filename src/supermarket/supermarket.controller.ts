import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { SupermarketService } from './supermarket.service';
import { SupermarketEntity } from './supermarket.entity/supermarket.entity';

@Controller('supermarkets')
@UseInterceptors(BusinessErrorsInterceptor)
export class SupermarketController {
  constructor(private readonly supermarketService: SupermarketService) {}

  @Get()
  async findAll() {
    return await this.supermarketService.findAll();
  }

  @Get(':supermarketId')
  async findOne(@Param('supermarketId') supermarketId: string) {
    return await this.supermarketService.findOne(supermarketId);
  }

  @Post()
  async create(@Body() supermarket: SupermarketEntity) {
    return await this.supermarketService.create(supermarket);
  }

  @Put(':supermarketId')
  async update(@Param('supermarketId') supermarketId: string, @Body() supermarket: SupermarketEntity) {
    return await this.supermarketService.update(supermarketId, supermarket);
  }

  @Delete(':supermarketId')
  @HttpCode(204)
  async delete(@Param('supermarketId') supermarketId: string) {
    return await this.supermarketService.delete(supermarketId);
  }
}
