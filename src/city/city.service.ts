import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from './city.entity/city.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  // Método para crear una ciudad
  async create(city: CityEntity): Promise<CityEntity> {
    // Validar que el país de la ciudad sea Argentina, Ecuador o Paraguay
    const validCountries = ['Argentina', 'Ecuador', 'Paraguay'];
    if (!validCountries.includes(city.country)) {
      throw new BusinessLogicException("El país debe ser Argentina, Ecuador o Paraguay", BusinessError.PRECONDITION_FAILED);
    }
    return await this.cityRepository.save(city);
  }

  // Método para obtener todas las ciudades
  async findAll(): Promise<CityEntity[]> {
    return await this.cityRepository.find({ relations: ['supermarkets'] });
  }

  // Método para obtener una ciudad por su ID
  async findOne(id: string): Promise<CityEntity> {
    const city: CityEntity = await this.cityRepository.findOne({ where: { id }, relations: ['supermarkets'] });
    if (!city) {
      throw new BusinessLogicException("No se encontró la ciudad con la identificación proporcionada", BusinessError.NOT_FOUND);
    }
    return city;
  }

  // Método para actualizar una ciudad por su ID
  async update(id: string, city: CityEntity): Promise<CityEntity> {
    const persistedCity: CityEntity = await this.cityRepository.findOne({ where: { id } });
    if (!persistedCity) {
      throw new BusinessLogicException("No se encontró la ciudad con la identificación proporcionada", BusinessError.NOT_FOUND);
    }

    // Validar que el país de la ciudad sea Argentina, Ecuador o Paraguay
    const validCountries = ['Argentina', 'Ecuador', 'Paraguay'];
    if (!validCountries.includes(city.country)) {
      throw new BusinessLogicException("El país debe ser Argentina, Ecuador o Paraguay", BusinessError.PRECONDITION_FAILED);
    }
    return await this.cityRepository.save({ ...persistedCity, ...city });
  }

  // Método para eliminar una ciudad
  async delete(id: string) {
    const city: CityEntity = await this.cityRepository.findOne({ where: { id } });
    if (!city) {
      throw new BusinessLogicException("No se encontró la ciudad con la identificación proporcionada", BusinessError.NOT_FOUND);
    }
    await this.cityRepository.remove(city);
  }
}
