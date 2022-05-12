import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

//@Entity('last_orders') -> custom name for table
@Entity()
export class Product {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	name: string;

	@ManyToMany(
		type => Order,
		order => order.products
	)
	orders: Order[];
}
