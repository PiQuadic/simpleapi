import { Injectable, Logger } from '@nestjs/common';
import { DhtReading } from './interfaces/dht-sensor.interface';

const sensor = require('node-dht-sensor').promises;
sensor.setMaxRetries(10);

@Injectable()
export class DhtSensorService {
  private readonly pin = 4;
  private readonly dhttype = 22;
  private readonly logger = new Logger(DhtSensorService.name);

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
