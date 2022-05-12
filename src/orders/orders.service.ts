import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ){}

    public async findAll() {
        return await this.orderRepository.find({
            relations: ['products'],
        });
    }

    public async findOne(id: string) {
        const order = await this.orderRepository.findOne(id, {
            relations: ['products'],
        });
        if (!order) {
            throw new NotFoundException(`Order #${id} not found bitch`)
        }
        return order;
    }

    public async createOne(orderDto: CreateOrderDto) {
        const products = await Promise.all(
            orderDto.products.map(name => this.preloadProductByName(name)),
        );

        const order = this.orderRepository.create({
            ...orderDto,
            products,
        });
        return this.orderRepository.save(order);
    }

    public async updateOne(id: string, orderDto: UpdateOrderDto) {
        const products = 
            orderDto.products &&
                (await Promise.all(
                    orderDto.products.map(name => this.preloadProductByName(name)),
                )
            );

        const order = await this.orderRepository.preload({
            id: +id,
            ...orderDto,
            products,
        });
        if (!order) {
            throw new NotFoundException(`Order #${id} not found bitch`)
        }
        return this.orderRepository.save(order);        
    }

    public async removeOne(id: string) {
        const order = await this.findOne(id);
        return this.orderRepository.remove(order);
    }

    private async preloadProductByName(name: string): Promise<Product> {
        const existingProduct = await this.productRepository.findOne({ name });
        if (existingProduct) 
            return existingProduct;
        return this.productRepository.create({ name });
    }
}
