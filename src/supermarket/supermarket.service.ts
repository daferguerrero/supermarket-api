import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupermarketEntity } from './supermarket.entity/supermarket.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class SupermarketService {
  constructor(
    @InjectRepository(SupermarketEntity)
    private readonly supermarketRepository: Repository<SupermarketEntity>,
  ) {}

  // Método para crear un supermercado
  async create(supermarket: SupermarketEntity): Promise<SupermarketEntity> {
    // Validar que el nombre del supermercado tenga más de 10 caracteres
    if (supermarket.name.length <= 10) {
      throw new BusinessLogicException(
        'El nombre del supermercado debe tener más de 10 caracteres',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    return await this.supermarketRepository.save(supermarket);
  }

  // Método para obtener todos los supermercados
  async findAll(): Promise<SupermarketEntity[]> {
    return await this.supermarketRepository.find({ relations: ['cities'] });
  }

  // Método para obtener un supermercado por su ID
  async findOne(id: string): Promise<SupermarketEntity> {
    const supermarket: SupermarketEntity = await this.supermarketRepository.findOne({
      where: { id },
      relations: ['cities'],
    });
    if (!supermarket) {
      throw new BusinessLogicException(
        'No se encontró el supermercado con la identificación proporcionada',
        BusinessError.NOT_FOUND,
      );
    }
    return supermarket;
  }

  // Método para actualizar un supermercado por su ID
  async update(id: string, supermarket: SupermarketEntity): Promise<SupermarketEntity> {
    const persistedSupermarket: SupermarketEntity = await this.supermarketRepository.findOne({
      where: { id },
    });
    if (!persistedSupermarket) {
      throw new BusinessLogicException(
        'No se encontró el supermercado con la identificación proporcionada',
        BusinessError.NOT_FOUND,
      );
    }

    // Validar que el nombre del supermercado tenga más de 10 caracteres
    if (supermarket.name.length <= 10) {
      throw new BusinessLogicException(
        'El nombre del supermercado debe tener más de 10 caracteres',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    return await this.supermarketRepository.save({ ...persistedSupermarket, ...supermarket });
  }

  // Método para eliminar un supermercado
  async delete(id: string) {
    const supermarket: SupermarketEntity = await this.supermarketRepository.findOne({
      where: { id },
    });
    if (!supermarket) {
      throw new BusinessLogicException(
        'No se encontró el supermercado con la identificación proporcionada',
        BusinessError.NOT_FOUND,
      );
    }
    await this.supermarketRepository.remove(supermarket);
  }
}
