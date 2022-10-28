import { Module } from '@nestjs/common';
import { RandomDataService } from './random-data.service';
import { UsersRepository } from 'src/Entities/user.repository';
import { RandomDataController } from './random-data.controller';
import { CountryRepository } from '../Entities/country.repository';
@Module({
  providers: [
    RandomDataService,
    UsersRepository,
    CountryRepository,
    
  ],
  controllers: [RandomDataController],
})
export class RandomDataModule { }
