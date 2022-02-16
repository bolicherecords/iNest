import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

//@Entity('last_orders') -> custom name for table
@Entity()
export class Order {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	total: number;
	
	@Column('json', { nullable: true })
	products: string[];
}
