import { Module } from '@nestjs/common';
import { I2cRelayService } from './i2c-relay.service';
import { I2cRelayController } from './i2c-relay.controller';

@Module({
  controllers: [I2cRelayController],
  providers: [I2cRelayService],
})
export class I2cRelayModule {}
