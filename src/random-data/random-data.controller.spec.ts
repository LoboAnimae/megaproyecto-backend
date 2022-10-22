import { Test, TestingModule } from '@nestjs/testing';
import { RandomDataController } from './random-data.controller';

describe('RandomDataController', () => {
  let controller: RandomDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RandomDataController],
    }).compile();

    controller = module.get<RandomDataController>(RandomDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
