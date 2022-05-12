import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../orders.service';
import { orderRepositoryMock } from './__mocks__/order.repository';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: Repository<Order>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: Repository<Order>,
          useFactory: orderRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<Repository<Order>>(Repository<Order>);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
