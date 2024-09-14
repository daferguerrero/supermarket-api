import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { CityEntity } from '../../city/city.entity/city.entity';

@Entity()
export class SupermarketEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 name: string;

 @Column('decimal', { precision: 10, scale: 6 }) // Ajuste para almacenar coordenadas decimales
 longitude: number;

 @Column('decimal', { precision: 10, scale: 6 }) // Ajuste para almacenar coordenadas decimales
 latitude: number;

 @Column()
 webpage: string;


// Relación Many-to-Many con City
 @ManyToMany(() => CityEntity, city => city.supermarkets)
 cities: CityEntity[];
}