import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// modules
import { DhtSensorModule } from './dht-sensor/dht-sensor.module';
import { I2cRelayModule } from './i2c-relay/i2c-relay.module';

// utility
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleModule } from '@nestjs/schedule';

// database
import { dataBaseConfig } from './database/database.config';

@Module({
  imports: [
    DhtSensorModule,
    I2cRelayModule,
    SequelizeModule.forRoot(dataBaseConfig),
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
