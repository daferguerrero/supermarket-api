import { Test, TestingModule } from '@nestjs/testing';
import { SupermarketCityService } from '../supermarket-city/supermarket-city.service';
import { SupermarketEntity } from '../supermarket/supermarket.entity/supermarket.entity';
import { CityEntity } from '../city/city.entity/city.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('SupermarketCityService', () => {
  let service: SupermarketCityService;
  let supermarketRepository: Repository<SupermarketEntity>;
  let cityRepository: Repository<CityEntity>;
  let supermarketsList: SupermarketEntity[];
  let citiesList: CityEntity[];
  let city: CityEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SupermarketCityService],
    }).compile();

    service = module.get<SupermarketCityService>(SupermarketCityService);
    cityRepository = module.get<Repository<CityEntity>>(getRepositoryToken(CityEntity));
    supermarketRepository = module.get<Repository<SupermarketEntity>>(getRepositoryToken(SupermarketEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await supermarketRepository.clear();  // Limpia los supermercados
    await cityRepository.clear();         // Limpia las ciudades

    supermarketsList = [];
    for (let i = 0; i < 5; i++) {
      const supermarket: SupermarketEntity = await supermarketRepository.save({
        name: faker.company.name(),
        longitude: faker.location.longitude(), // Genera valores válidos
        latitude: faker.location.latitude(),  // Genera valores válidos
        webpage: faker.internet.url(),
        city: citiesList,
      });
      supermarketsList.push(supermarket);
    }

    city = await cityRepository.save({
      name: faker.location.city(),
      country: faker.location.country(),
      inhabitants: faker.number.int(),
      supermarkets: supermarketsList,
    });
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 1. Prueba para asociar un supermercado a una ciudad
  it('addSupermarketToCity should add a supermarket to a city', async () => {
    const newSupermarket: SupermarketEntity = await supermarketRepository.save({
      name: faker.company.name(),
      longitude: faker.location.longitude(), // Genera valores válidos
      latitude: faker.location.latitude(),  // Genera valores válidos
      webpage: faker.internet.url(),
    });

    const newCity: CityEntity = await cityRepository.save({
      name: faker.location.city(),
      country: faker.location.country(),
      inhabitants: faker.number.int(),
    });

    const result: CityEntity = await service.addSupermarketToCity(newCity.id, newSupermarket.id);

    expect(result.supermarkets.length).toBe(1);
    expect(result.supermarkets[0]).not.toBeNull();
    expect(result.supermarkets[0].name).toBe(newSupermarket.name);
  });

  // 2. Test para obtener todos los supermercados que tiene una ciudad
  it('findSupermarketsByCityId should return supermarkets by city', async () => {
    const supermarkets: SupermarketEntity[] = await service.findSupermarketsFromCity(city.id);
    expect(supermarkets.length).toBe(5);
  });

  // 3. Test para obtener un supermercado de una ciudad
  it('findSupermarketByCityIdAndSupermarketId should return supermarket by city', async () => {
    const supermarket: SupermarketEntity = supermarketsList[0];
    const storedSupermarket: SupermarketEntity = await service.findSupermarketFromCity(city.id, supermarket.id);
    expect(storedSupermarket).not.toBeNull();
    expect(storedSupermarket.name).toBe(supermarket.name);
  });

  // 4. Test para actualizar los supermercados de una ciudad
  it('associateSupermarketsToCity should update supermarkets list for a city', async () => {
    const newSupermarket: SupermarketEntity = await supermarketRepository.save({
      name: faker.company.name(),
      longitude: faker.location.longitude(), // Genera valores válidos
      latitude: faker.location.latitude(),  // Genera valores válidos
      webpage: faker.internet.url(),
    });

    const updatedCity: CityEntity = await service.updateSupermarketsFromCity(city.id, [newSupermarket]);
    expect(updatedCity.supermarkets.length).toBe(1);
    expect(updatedCity.supermarkets[0].name).toBe(newSupermarket.name);
  });

  // 5. Test eliminar un supermercado que tiene una ciudad
  it('deleteSupermarketFromCity should remove a supermarket from a city', async () => {
    const supermarket: SupermarketEntity = supermarketsList[0];

    await service.deleteSupermarketFromCity(city.id, supermarket.id);

    const storedCity: CityEntity = await cityRepository.findOne({ where: { id: city.id }, relations: ["supermarkets"] });
    const deletedSupermarket: SupermarketEntity = storedCity.supermarkets.find(a => a.id === supermarket.id);

    expect(deletedSupermarket).toBeUndefined();
  });
});
