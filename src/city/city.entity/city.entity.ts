import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { SupermarketEntity } from '../../supermarket/supermarket.entity/supermarket.entity'

@Entity()
export class CityEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 name: string;

 @Column({ nullable: false })  // country no debe permitir nulos
 country: string;

 @Column()
 inhabitants: number;


 // Relación Many-to-Many con Supermarket
 @ManyToMany(() => SupermarketEntity, supermarket => supermarket.cities)
 @JoinTable()  // Esto crea la tabla intermedia en la base de datos para la relación.
 supermarkets: SupermarketEntity[];
}
