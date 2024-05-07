import { Module } from '@nestjs/common';
import { DhtSensorModule } from './dht-sensor/dht-sensor.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';
import { DhtSensorService } from './dht-sensor/dht-sensor.service';
import { GpioRelaysModule } from './gpio-relays/gpio-relays.module';

@Module({
  imports: [ DhtSensorModule, GpioRelaysModule ],
  controllers: [AppController],
  providers: [AppService, DhtSensorService],
})
export class AppModule {}
