import { Module } from '@nestjs/common';
import { RandomDataService } from './random-data.service';
import { RandomDataController } from './random-data.controller';

@Module({
  providers: [RandomDataService],
  controllers: [RandomDataController]
})
export class RandomDataModule {}
