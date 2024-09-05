import { Module } from '@nestjs/common';
import { I2cRelayService } from './i2c-relay.service';
import { I2cRelayController } from './i2c-relay.controller';
import { I2cRelay } from './entities/i2c-relay.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  //imports: [SequelizeModule.forFeature([I2cRelayReading]), SequelizeModule.forFeature([I2cRelay])],
  imports: [SequelizeModule.forFeature([I2cRelay])],
  controllers: [I2cRelayController],
  providers: [I2cRelayService],
})
export class I2cRelayModule { }
