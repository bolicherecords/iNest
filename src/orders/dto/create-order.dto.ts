import { IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
	@IsString()
	readonly id: number;

	@IsNumber()
	readonly total: number;

	@IsString({ each: true })
	readonly products: string[];
}
