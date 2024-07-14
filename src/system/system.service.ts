import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { System} from './entities/system.entity';

const si = require('systeminformation');

@Injectable()
export class SystemService {
  constructor(
    @InjectModel(System)
    private systemRepository: typeof System,
  ) {}

  private readonly logger = new Logger(SystemService.name);

  create(createSystemDto: CreateSystemDto) {
    return 'This action adds a new system';
  }

  findAll() {
    return `This action returns all system`;
  }

  findOne(id: number) {
    return `This action returns a #${id} system`;
  }

  update(id: number, updateSystemDto: UpdateSystemDto) {
    return `This action updates a #${id} system`;
  }

  remove(id: number) {
    return `This action removes a #${id} system`;
  }

  log()  {
    si.cpuTemperature()
      .then(data => this.logger.log(data))
      .catch(error => this.logger.error(error));

    si.fsSize()
      .then(data => this.logger.log(data))
      .catch(error => this.logger.error(error));
  }
}
