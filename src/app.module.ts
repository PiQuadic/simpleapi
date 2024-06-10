import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';


// utility
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleModule } from '@nestjs/schedule';

// database
import { dataBaseConfig } from './database/database.config';

// modules
import { DhtSensorModule } from './dht-sensor/dht-sensor.module';
import { I2cRelayModule } from './i2c-relay/i2c-relay.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    SequelizeModule.forRoot(dataBaseConfig),
    ScheduleModule.forRoot(),
    DhtSensorModule,
    I2cRelayModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
