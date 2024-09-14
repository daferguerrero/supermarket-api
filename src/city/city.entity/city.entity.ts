import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { SupermarketEntity } from '../../supermarket/supermarket.entity/supermarket.entity'

@Entity()
export class CityEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 name: string;

 @Column()
 country: string;

 @Column()
 inhabitants: number;


 @ManyToMany(() => SupermarketEntity, supermarket => supermarket.cities)
 supermarkets: SupermarketEntity[];
}
