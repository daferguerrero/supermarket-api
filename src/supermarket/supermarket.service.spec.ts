import { Test, TestingModule } from '@nestjs/testing';
import { SupermarketService } from './supermarket.service';
import { SupermarketEntity } from './supermarket.entity/supermarket.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';

describe('SupermarketService', () => {
  let service: SupermarketService;
  let repository: Repository<SupermarketEntity>;
  let supermarketsList: SupermarketEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SupermarketService],
    }).compile();

    service = module.get<SupermarketService>(SupermarketService);
    repository = module.get<Repository<SupermarketEntity>>(getRepositoryToken(SupermarketEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    supermarketsList = [];
    for (let i = 0; i < 5; i++) {
      const supermarket: SupermarketEntity = await repository.save({
        name: faker.company.name(),
        longitude: faker.location.longitude(),
        latitude: faker.location.latitude(),
        webpage: faker.internet.url(),
        // cities: [] // Inicialmente sin relación a ciudades
      });
      supermarketsList.push(supermarket);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Prueba método findAll
  it('findAll should return all supermarkets', async () => {
    const supermarkets: SupermarketEntity[] = await service.findAll();
    expect(supermarkets).not.toBeNull();
    expect(supermarkets).toHaveLength(supermarketsList.length);
  });

  // Prueba método findOne
  it('findOne should return a supermarket by id', async () => {
    const storedSupermarket: SupermarketEntity = supermarketsList[0];
    const supermarket: SupermarketEntity = await service.findOne(storedSupermarket.id);
    expect(supermarket).not.toBeNull();
    expect(supermarket.name).toEqual(storedSupermarket.name);
    expect(supermarket.longitude).toEqual(storedSupermarket.longitude);
    expect(supermarket.latitude).toEqual(storedSupermarket.latitude);
    expect(supermarket.webpage).toEqual(storedSupermarket.webpage);
  });

  // Prueba método findOne: supermercado no existente
  it('findOne should throw an exception for an invalid supermarket', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'No se encontró el supermercado con la identificación proporcionada',
    );
  });
});
