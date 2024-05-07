import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GpioRelaysService } from './gpio-relays.service';
import { CreateGpioRelayDto } from './dto/create-gpio-relay.dto';
import { UpdateGpioRelayDto } from './dto/update-gpio-relay.dto';

@Controller('gpio-relays')
export class GpioRelaysController {
  constructor(private readonly gpioRelaysService: GpioRelaysService) {}

  @Post()
  create(@Body() createGpioRelayDto: CreateGpioRelayDto) {
    return this.gpioRelaysService.create(createGpioRelayDto);
  }

  @Get()
  findAll() {
    return this.gpioRelaysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gpioRelaysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGpioRelayDto: UpdateGpioRelayDto) {
    return this.gpioRelaysService.update(+id, updateGpioRelayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gpioRelaysService.remove(+id);
  }
}
