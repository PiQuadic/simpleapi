import { Module } from '@nestjs/common';
import { DhtSensorModule } from './dht-sensor/dht-sensor.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';
import { DhtSensorService } from './dht-sensor/dht-sensor.service';

@Module({
  imports: [ DhtSensorModule ],
  controllers: [AppController],
  providers: [AppService, DhtSensorService],
})
export class AppModule {}
