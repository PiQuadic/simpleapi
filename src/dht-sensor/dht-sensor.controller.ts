import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { DhtSensorService } from './dht-sensor.service';
import { DhtReading, DhtSensorLog } from './interfaces/dht-sensor.interface';
import { CreateDhtSensorLogDto } from './dto/create-dht-sensor.dto';

@Controller('sensors')
export class DhtSensorController {

  constructor(private dhtService: DhtSensorService) { }
  private readonly logger = new Logger(DhtSensorController.name);

  @Post()
  create(@Body() createDhtSensorLogDto: CreateDhtSensorLogDto) {
    return this.dhtService.create(createDhtSensorLogDto);
  }

  @Get()
  async read(): Promise<DhtReading> {
    this.logger.log('Reading DHT Sensor');
    return await this.dhtService.read();
  }

  @Get('log')
  async log(): Promise<DhtReading> {
    this.logger.log('Logging DHT Sensor');
    return await this.dhtService.log();
  }

  @Get('/:id/:hours')
  async temps(@Param('id') id: string, @Param('hours') hours: string): Promise<DhtSensorLog[] | DhtSensorLog> {
    return await this.dhtService.getLogs(id, hours);
  }

}
