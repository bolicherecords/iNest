import { IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
	@IsNumber()
	readonly id: number;

	@IsNumber()
	readonly total: number;

	@IsString({ each: true })
	readonly products: string[];
}
