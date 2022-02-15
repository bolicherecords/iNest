import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';


@Controller('orders')
export class OrdersController {

  constructor(private readonly ordersService: OrdersService){}

  @Get()
  findAll(@Query() paginationQuery){
    const { limit, offset } = paginationQuery;
    return `All Pizzas. Limit: ${limit}, Offset: ${offset}`;
  }

  @Get('cheese')
  findAllWithCheese(){
    return 'All Pizzas with cheese nested'
  }

  @Get(':id')
  findOne(@Param('id') id:string){
    return `Pizza id N° ${id}`
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOne(@Body() body){
    // @Body('name') name: String
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updates #${id} coffee`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `This action removes #${id} coffee`;
  }
}
