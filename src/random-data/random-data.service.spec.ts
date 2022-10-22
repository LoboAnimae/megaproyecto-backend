import { Test, TestingModule } from '@nestjs/testing';
import { RandomDataService } from './random-data.service';

describe('RandomDataService', () => {
  let service: RandomDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomDataService],
    }).compile();

    service = module.get<RandomDataService>(RandomDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
