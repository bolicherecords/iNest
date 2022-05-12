import { Product } from "src/products/entities/product.entity";
import { Column, Entity, PrimaryGeneratedColumn, JoinTable, ManyToMany } from "typeorm";

//@Entity('last_orders') -> custom name for table
@Entity()
export class Order {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	total: number;
	
	@JoinTable()
	@ManyToMany(
		type => Product,
		product => product.orders,
		{
			cascade: true, //['insert']
		}
	)
	products: Product[];
}
