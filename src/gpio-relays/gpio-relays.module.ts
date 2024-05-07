import { Module } from '@nestjs/common';
import { GpioRelaysService } from './gpio-relays.service';
import { GpioRelaysController } from './gpio-relays.controller';

@Module({
  controllers: [GpioRelaysController],
  providers: [GpioRelaysService],
})
export class GpioRelaysModule {}
