import { Module } from '@nestjs/common';
import { DhtSensorService } from './dht-sensor.service';
import { DhtSensorController } from './dht-sensor.controller';
import { DhtSensorLog } from './entities/dht-sensor.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([ DhtSensorLog ])],
  controllers: [ DhtSensorController ],
  providers: [ DhtSensorService ],
})

export class DhtSensorModule {}
