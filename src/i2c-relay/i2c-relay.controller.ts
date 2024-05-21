import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { I2cRelayService } from './i2c-relay.service';
import { I2cRelay } from './entities/i2c-relay.entity';
import { I2cRelayReading } from './entities/i2c-relay-log.entity';
import { CreateI2cRelayDto } from './dto/create-i2c-relay.dto';
import { UpdateI2cRelayDto } from './dto/update-i2c-relay.dto';

@Controller('i2c-relay')
export class I2cRelayController {
  constructor(private readonly i2cRelayService: I2cRelayService) {}

  @Post()
  create(@Body() createI2cRelayDto: CreateI2cRelayDto) {
    return this.i2cRelayService.create(createI2cRelayDto);
  }

  @Get()
  findAll() {
    return this.i2cRelayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.i2cRelayService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateI2cRelayDto: Partial<UpdateI2cRelayDto>) {
    //updateI2cRelayDto.value = 'on';
    return this.i2cRelayService.update(id, updateI2cRelayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.i2cRelayService.remove(id);
  }

  /*
  @Get('read')
  readall(): Promise<I2cRelayReading[]> {
    return this.i2cRelayService.findAll();
  }

  @Get('read/:relay_id')
  read(@Param('relay_id') relay_id: string): Promise<I2cRelayReading> {
    return this.i2cRelayService.read(relay_id);
  }

  @Get('change/:relay_id/:position')
  change(@Param('relay_id') relay_id: string, @Param('position') position: string): Promise<I2cRelayReading> {
    return this.i2cRelayService.change(relay_id, position);
  }
  
  // does all anyway
  @Get('log')
  log(): Promise<I2cRelayReading[]> {
    return this.i2cRelayService.log();
  }
 */
}
