import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';


@Controller('orders')
export class OrdersController {

  constructor(private readonly ordersService: OrdersService){}

  @Get()
  public async findAll(@Query() paginationQuery){
    // const { limit, offset } = paginationQuery;
    // return `All Pizzas. Limit: ${limit}, Offset: ${offset}`;
    return await this.ordersService.findAll();
  }

  @Get('cheese')
  public findAllWithCheese(){
    return 'All Pizzas with cheese nested'
  }

  @Get(':id')
  public async findOne(@Param('id') id:string){
    return await this.ordersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createOne(@Body() orderDto: CreateOrderDto){
    // @Body('name') name: String
    return await this.ordersService.createOne(orderDto);
  }

  @Patch(':id')
  public async updateOne(@Param('id') id: string, @Body() orderDto: UpdateOrderDto) {
    return await this.ordersService.updateOne(id, orderDto);
  }

  @Delete(':id')
  public async removeOne(@Param('id') id: string) {
    return await this.ordersService.removeOne(id);
  }
}
