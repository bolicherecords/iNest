export class CreateOrderDto {
	readonly id: number;
	readonly total: number;
	readonly products: string[];
}
