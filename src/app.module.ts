import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DhtSensorService } from './dht-sensor/dht-sensor.service';
import { DhtSensorModule } from './dht-sensor/dht-sensor.module';

import { I2cRelayModule } from './i2c-relay/i2c-relay.module';
import { I2cRelayService } from './i2c-relay/i2c-relay.service';

@Module({
  imports: [DhtSensorModule, I2cRelayModule],
  controllers: [AppController],
  providers: [AppService, DhtSensorService, I2cRelayService],
})
export class AppModule { }
