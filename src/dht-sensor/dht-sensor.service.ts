import { Injectable } from '@nestjs/common';
import { DhtReading } from './interfaces/dht-sensor.interface';

const sensor = require('node-dht-sensor').promises;

@Injectable()
export class DhtSensorService {
  private readonly pin = 4;
  private readonly dhttype = 22;

  read(): DhtReading {
    sensor.setMaxRetries(10);
    sensor.initialize(this.dhttype, this.pin);
    return sensor.read(this.dhttype, this.pin).then(
      function (res) {
        console.log(`temp: ${res.temperature} deg C, humidity: ${res.humidity}%`);
        return {
          temperature: res.temperature,
          humidity: res.humidity
        };
      },
      function (err) {
        console.error("Failed to read sensor: ", err);
      }
    );
  }

}
