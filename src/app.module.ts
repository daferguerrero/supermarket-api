import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { CityEntity } from './city/city.entity/city.entity';
import { SupermarketModule } from './supermarket/supermarket.module';
import { SupermarketEntity } from './supermarket/supermarket.entity/supermarket.entity';
import { SupermarketCityService } from './supermarket-city/supermarket-city.service';
import { SupermarketCityModule } from './supermarket-city/supermarket-city.module';

@Module({
  imports: [CityModule, SupermarketModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'supermarket',
      entities: [CityEntity, SupermarketEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    SupermarketCityModule,
  ],
  controllers: [AppController],
  providers: [AppService, SupermarketCityService],
})
export class AppModule {}
