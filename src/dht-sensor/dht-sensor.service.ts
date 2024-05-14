import { Injectable, Logger } from '@nestjs/common';
import { CreateDhtSensorLogDto } from './dto/create-dht-sensor.dto';
import { DhtReading } from './interfaces/dht-sensor.interface';
import { DhtSensorLog } from './entities/dht-sensor.entity';
import { InjectModel } from '@nestjs/sequelize';

const sensor = require('node-dht-sensor').promises;
sensor.setMaxRetries(10);

@Injectable()
export class DhtSensorService {

  constructor(
    @InjectModel(DhtSensorLog)
    private dhtSensorLogRepository: typeof DhtSensorLog,
  ) {}

  private readonly pin = 4;
  private readonly dhttype = 22;
  private readonly logger = new Logger(DhtSensorService.name);

  create(createDhtSensorLogDto: CreateDhtSensorLogDto): string {
    this.logger.log('Create DHT Log:');
    this.logger.log(createDhtSensorLogDto);
    return 'This action adds a new i2cRelay';
  }

  read(): Promise<DhtReading> {
    sensor.initialize(this.dhttype, this.pin);
    return sensor.read(this.dhttype, this.pin).then(
      (res) => {
        this.logger.log(`temp: ${res.temperature} deg C, humidity: ${res.humidity}%`);
        return {
          temperature: res.temperature,
          humidity: res.humidity
        };
      },
      (err) => {
        this.logger.error("Failed to read sensor: ", err);
      }
    );
  }

  log(): Promise<DhtReading> {
    sensor.initialize(this.dhttype, this.pin);
    return sensor.read(this.dhttype, this.pin).then(
      (res) => {
        this.logger.log(`temp: ${res.temperature} deg C, humidity: ${res.humidity}%`);
        
        this.dhtSensorLogRepository.create({
          id: 'tempsensor',
          name: 'ambient temp',
          value: res.temperature,
        });

        this.dhtSensorLogRepository.create({
          id: 'humiditysensor',
          name: 'ambient humidity',
          value: res.humidity,
        });

        return {
          temperature: res.temperature,
          humidity: res.humidity
        };
      },
      (err) => {
        this.logger.error("Failed to read sensor: ", err);
      }
    );
  }

}
