import { Body, Controller, Get, Logger, Patch, Param } from '@nestjs/common';
import { I2cRelayService } from './i2c-relay.service';
import { I2cRelay } from './entities/i2c-relay.entity';
//import { I2cRelayReading } from './entities/i2c-relay-log.entity';
import { UpdateI2cRelayDto } from './dto/update-i2c-relay.dto';

@Controller('i2c-relay')
export class I2cRelayController {
  constructor(private readonly i2cRelayService: I2cRelayService) { }
  private readonly logger = new Logger(I2cRelayController.name);

  @Get()
  findAll() {
    this.logger.log('Getting all i2c relays');
    return this.i2cRelayService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateI2cRelayDto: UpdateI2cRelayDto) {
    //updateI2cRelayDto.value = 'on';
    return this.i2cRelayService.update(id, updateI2cRelayDto);
  }
}
