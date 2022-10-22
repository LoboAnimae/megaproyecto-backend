import { Controller, Get } from '@nestjs/common';
import { generateRandomEmail, generateRandomTime } from '../Misc/FakerFunctions';

@Controller('random-data')
export class RandomDataController {
    @Get()
    generateData() {
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push(generateRandomTime(10));
        }
        return data;
    }
}
