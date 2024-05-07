import { Controller, Get } from '@nestjs/common';
import { DhtSensorService } from './dht-sensor.service'; 
import { DhtReading } from './interfaces/dht-sensor.interface';

@Controller('dht-sensor')
export class DhtSensorController {

  constructor(private dhtService: DhtSensorService) {}

  @Get()
  read(): DhtReading {
    return this.dhtService.read();
  }
}
