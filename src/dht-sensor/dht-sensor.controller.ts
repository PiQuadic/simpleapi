import { Controller, Get, Logger } from '@nestjs/common';
import { DhtSensorService } from './dht-sensor.service'; 
import { DhtReading } from './interfaces/dht-sensor.interface';

@Controller('dht-sensor')
export class DhtSensorController {

  constructor( private dhtService: DhtSensorService ) {}
  private readonly logger = new Logger(DhtSensorController.name);

  @Get()
  read(): Promise<DhtReading> {
    this.logger.log('Reading DHT Sensor');
    return this.dhtService.read();
  }

  @Get('log')
  log(): Promise<DhtReading> {
    return this.dhtService.log();
  }
}
