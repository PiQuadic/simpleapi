import { Module } from '@nestjs/common';
import { DhtSensorController } from './dht-sensor.controller';
import { DhtSensorService } from './dht-sensor.service';

@Module({
  controllers: [DhtSensorController],
  providers: [ DhtSensorService ],
})

export class DhtSensorModule {}
