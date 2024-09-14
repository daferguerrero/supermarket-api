 import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
 import { CityEntity } from '../../city/city.entity/city.entity';

@Entity()
export class SupermarketEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 name: string;

 @Column()
 longitude: number;

 @Column()
 latitude: number;

 @Column()
 webpage: string;


 @ManyToMany(() => CityEntity, city => city.supermarkets)
 cities: CityEntity[];
}