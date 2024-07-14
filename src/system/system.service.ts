import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { System } from './entities/system.entity';
import { Op } from "sequelize";
import { Cron } from '@nestjs/schedule';

const si = require('systeminformation');

@Injectable()
export class SystemService {
  constructor(
    @InjectModel(System)
    private systemRepository: typeof System,
  ) {}

  private readonly logger = new Logger(SystemService.name);
  private readonly validId = ['cpuTemperature', 'fileUsage'];

  create(createSystemDto: CreateSystemDto) {
    return 'This action adds a new system';
  }

  getLogs(id, hours): Promise<System[]> {
    this.logger.log(`id: ${id} hours: ${hours}`)

    const hrs = parseInt(hours);

    const strFmt = (dt) => {
      return `${dt.getDate()}/${(dt.getMonth()+1)}-${dt.getHours()}:${dt.getMinutes()}`
    }

    const from = new Date(); 
    const to = new Date(new Date().valueOf() - hrs * 60 * 60 * 1000);

    this.logger.log( `From: ${strFmt(from)} To: ${strFmt(to)}`);


    return this.systemRepository.findAll({
      where: {
        system_id: {
          [Op.eq]: this.validId.includes(id) ? id : this.validId[0]
        },
        updatedAt: {
          [Op.lt]: from,
          [Op.gt]: to 
        }
      }
    });
  }
  findAll() {
    return this.systemRepository.findAll();
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

  async log() {
    const cpuTemp = await si.cpuTemperature()
      .then(data => {
        this.logger.log(data);
        return this.systemRepository.create({
          system_id: 'cpuTemperature',
          name: 'cpu temp',
          value: data.main,
        });
      })
      .catch(error => this.logger.error(error));

    const fsSize = await si.fsSize()
      .then(data => {
        this.logger.log(data);
        return this.systemRepository.create({
          system_id: 'fileUsage',
          name: 'file usage',
          value: data[0].use,
        });
      })
      .catch(error => this.logger.error(error));
    return JSON.stringify([cpuTemp, fsSize]);
  }

  @Cron('*/5 * * * *')
  handleCron() {
    this.logger.log('Cron Initiated');
    this.log();
  }
  
}
