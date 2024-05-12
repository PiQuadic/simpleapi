import { Module } from '@nestjs/common';
import { DhtSensorModule } from './dht-sensor/dht-sensor.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';
import { DhtSensorService } from './dht-sensor/dht-sensor.service';
import { I2cRelayModule } from './i2c-relay/i2c-relay.module';

@Module({
  imports: [DhtSensorModule, I2cRelayModule],
  controllers: [AppController],
  providers: [AppService, DhtSensorService],
})
export class AppModule { }
