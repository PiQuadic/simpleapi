import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemService } from './system.service';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { System } from './entities/system.entity';

@Controller('system')
export class SystemController {
  constructor(private systemService: SystemService) { }

  @Post()
  async create(@Body() createSystemDto: CreateSystemDto) {
    return await this.systemService.create(createSystemDto);
  }

  @Get()
  async findAll() {
    return await this.systemService.findAll();
  }

  @Get('/log')
  async log() {
    return await this.systemService.log();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.systemService.findOne(+id);
  }

  @Get('/:id/:hours')
  async getLogs(@Param('id') id: string, @Param('hours') hours: string): Promise<System[] | System> {
    return await this.systemService.getLogs(id, hours);
  }
}
