import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupermarketEntity } from '../supermarket/supermarket.entity/supermarket.entity';
import { CityEntity } from '../city/city.entity/city.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class SupermarketCityService {
  constructor(
    @InjectRepository(SupermarketEntity)
    private readonly supermarketRepository: Repository<SupermarketEntity>,

    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  // 1. Asociar un supermercado a una ciudad
  async addSupermarketToCity(cityId: string, supermarketId: string): Promise<CityEntity> {
    const supermarket: SupermarketEntity = await this.supermarketRepository.findOne({ where: { id: supermarketId } });
    if (!supermarket)
      throw new BusinessLogicException('El supermercado con el ID proporcionado no fue encontrado', BusinessError.NOT_FOUND);

    const city: CityEntity = await this.cityRepository.findOne({ where: { id: cityId }, relations: ['supermarkets'] });
    if (!city)
      throw new BusinessLogicException('La ciudad con el ID proporcionado no fue encontrada', BusinessError.NOT_FOUND);

    city.supermarkets = [...city.supermarkets, supermarket];
    return await this.cityRepository.save(city);
  }

  // 2. Obtener los supermercados que tiene una ciudad
  async findSupermarketsFromCity(cityId: string): Promise<SupermarketEntity[]> {
    const city: CityEntity = await this.cityRepository.findOne({ where: { id: cityId }, relations: ['supermarkets'] });
    if (!city)
      throw new BusinessLogicException('La ciudad con el ID proporcionado no fue encontrada', BusinessError.NOT_FOUND);

    return city.supermarkets;
  }

  // 3. Obtener un supermercado de una ciudad
  async findSupermarketFromCity(cityId: string, supermarketId: string): Promise<SupermarketEntity> {
    const city: CityEntity = await this.cityRepository.findOne({ where: { id: cityId }, relations: ['supermarkets'] });
    if (!city)
      throw new BusinessLogicException('La ciudad con el ID proporcionado no fue encontrada', BusinessError.NOT_FOUND);

    const supermarket: SupermarketEntity = city.supermarkets.find((supermarket) => supermarket.id === supermarketId);
    if (!supermarket)
      throw new BusinessLogicException(
        'El supermercado con el ID proporcionado no está asociado a la ciudad',
        BusinessError.PRECONDITION_FAILED,
      );

    return supermarket;
  }

  // 4. Actualizar los supermercados que tiene una ciudad
  async updateSupermarketsFromCity(cityId: string, supermarkets: SupermarketEntity[]): Promise<CityEntity> {
    const city: CityEntity = await this.cityRepository.findOne({ where: { id: cityId }, relations: ['supermarkets'] });
    if (!city)
      throw new BusinessLogicException('La ciudad con el ID proporcionado no fue encontrada', BusinessError.NOT_FOUND);

    for (const supermarket of supermarkets) {
      const existingSupermarket = await this.supermarketRepository.findOne({ where: { id: supermarket.id } });
      if (!existingSupermarket)
        throw new BusinessLogicException(
          `El supermercado con el ID ${supermarket.id} no fue encontrado`,
          BusinessError.NOT_FOUND,
        );
    }

    city.supermarkets = supermarkets;
    return await this.cityRepository.save(city);
  }

// 5. Eliminar el supermercado que tiene una ciudad
  async deleteSupermarketFromCity(cityId: string, supermarketId: string) {
    const city: CityEntity = await this.cityRepository.findOne({ where: { id: cityId }, relations: ['supermarkets'] });
    if (!city)
      throw new BusinessLogicException('La ciudad con el ID proporcionado no fue encontrada', BusinessError.NOT_FOUND);

    const supermarket: SupermarketEntity = city.supermarkets.find((supermarket) => supermarket.id === supermarketId);
    if (!supermarket)
      throw new BusinessLogicException(
        'El supermercado con el ID proporcionado no está asociado a la ciudad',
        BusinessError.PRECONDITION_FAILED,
      );

    city.supermarkets = city.supermarkets.filter((supermarket) => supermarket.id !== supermarketId);
    await this.cityRepository.save(city);
  }
}