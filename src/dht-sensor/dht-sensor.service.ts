import { Injectable, Logger } from '@nestjs/common';
import { CreateDhtSensorLogDto } from './dto/create-dht-sensor.dto';
import { DhtReading } from './interfaces/dht-sensor.interface';
import { DhtSensorLog } from './entities/dht-sensor.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from "sequelize";
import { Cron } from '@nestjs/schedule';

const sensor = require('node-dht-sensor').promises;
sensor.setMaxRetries(10);

@Injectable()
export class DhtSensorService {

  constructor(
    @InjectModel(DhtSensorLog)
    private dhtSensorLogRepository: typeof DhtSensorLog,
  ) { }

  private readonly validId = ['tempsensor', 'humiditysensor'];
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
          sensor_id: 'tempsensor',
          name: 'ambient temp',
          value: res.temperature,
        });

        this.dhtSensorLogRepository.create({
          sensor_id: 'humiditysensor',
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

  getLogs(id, hours): Promise<DhtSensorLog[]> {
    this.logger.log(`id: ${id} hours: ${hours}`)

    const strFmt = (dt) => {
      return `${dt.getDate()}/${(dt.getMonth() + 1)}-${dt.getHours()}:${dt.getMinutes()}`
    }

    const hrs = parseInt(hours);
    if (hrs === 0) {
      const res = this.dhtSensorLogRepository.findOne({
        where: {
          sensor_id: {
            [Op.eq]: this.validId.includes(id) ? id : this.validId[0]
          }
        }
      });
      return [res];
    }

    const from = new Date();
    const to = new Date(new Date().valueOf() - hrs * 60 * 60 * 1000);

    this.logger.log(`From: ${strFmt(from)} To: ${strFmt(to)}`);


    // horrible shortcut to security and leaves only two options
    return this.dhtSensorLogRepository.findAll({
      where: {
        sensor_id: {
          [Op.eq]: this.validId.includes(id) ? id : this.validId[0]
        },
        updatedAt: {
          [Op.lt]: from,
          [Op.gt]: to
        }
      }
    });
  }

  @Cron('*/5 * * * *')
  handleCron() {
    this.logger.log('Cron Initiated');
    const junk = this.log();
  }
}
