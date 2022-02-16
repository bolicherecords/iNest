import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ){}

    public async findAll() {
        return await this.orderRepository.find();
    }

    public async findOne(id: number) {
        const order = await this.orderRepository.findOne(id);
        if (!order) {
            throw new NotFoundException(`Order #${id} not found bitch`)
        }
        return order;
    }

    public createOne(orderDto: any) {
        const order = this.orderRepository.create(orderDto);
        return this.orderRepository.save(order);
    }

    public async updateOne(id: number, orderDto: any) {
        const order = await this.orderRepository.preload({
            id: +id,
            ...orderDto,
        });
        if (!order) {
            throw new NotFoundException(`Order #${id} not found bitch`)
        }
        return this.orderRepository.save(order);        
    }

    public async removeOne(id: number) {
        const order = await this.findOne(id);
        return this.orderRepository.remove(order);
    }
}
