import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { I2cRelayService } from './i2c-relay.service';
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
    return this.i2cRelayService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateI2cRelayDto: UpdateI2cRelayDto) {
    return this.i2cRelayService.update(+id, updateI2cRelayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.i2cRelayService.remove(+id);
  }
}
