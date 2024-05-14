import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DhtSensorModule } from './dht-sensor/dht-sensor.module';
import { I2cRelayModule } from './i2c-relay/i2c-relay.module';

import { dataBaseConfig } from './database/database.config';
import { SequelizeModule } from '@nestjs/sequelize';


@Module({
  imports: [DhtSensorModule, I2cRelayModule, SequelizeModule.forRoot(dataBaseConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
