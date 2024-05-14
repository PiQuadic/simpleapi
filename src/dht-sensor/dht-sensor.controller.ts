import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { DhtSensorService } from './dht-sensor.service'; 
import { DhtReading } from './interfaces/dht-sensor.interface';
import { CreateDhtSensorLogDto } from './dto/create-dht-sensor.dto';

@Controller('dht-sensor')
export class DhtSensorController {

  constructor( private dhtService: DhtSensorService ) {}
  private readonly logger = new Logger(DhtSensorController.name);

  @Post()
  create(@Body() createDhtSensorLogDto: CreateDhtSensorLogDto) {
    return this.dhtService.create(createDhtSensorLogDto);
  }

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
