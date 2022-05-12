import { IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
	@IsNumber()
	readonly total: number;

	@IsString({ each: true })
	readonly products: string[];
}
