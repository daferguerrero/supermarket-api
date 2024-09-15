import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { CityEntity } from './city.entity/city.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';


describe('CityService', () => {
  let service: CityService;
  let repository: Repository<CityEntity>;
  let citiesList

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CityService],
    }).compile();

    service = module.get<CityService>(CityService);
    repository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    citiesList = [];
    for(let i = 0; i < 5; i++){
      const city: CityEntity = await repository.save({
        name: faker.location.city(),
        country: faker.location.country(),
        inhabitants: faker.number.int(),

        // supermarket: null
      });
      citiesList.push(city);
  }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('findAll should return all cities', async () => {
     const cities: CityEntity[] = await service.findAll();
     expect(cities).not.toBeNull();
     expect(cities).toHaveLength(citiesList.length);
   });

  it('findOne should return a city by id', async () => {
    const storedCity: CityEntity = citiesList[0];
    const city: CityEntity = await service.findOne(storedCity.id);
    expect(city).not.toBeNull();
    expect(city.name).toEqual(storedCity.name);
    expect(city.country).toEqual(storedCity.country);
    expect(city.inhabitants).toEqual(storedCity.inhabitants);
  });

  it('findOne should throw an exception for an invalid city', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message', 'No se encontró la ciudad con la identificación proporcionada');
  });

  it('findOne should throw an exception for an invalid city', async () => {
     await expect(() => service.findOne("0")).rejects.toHaveProperty('message', 'No se encontró la ciudad con la identificación proporcionada')
   });
});
