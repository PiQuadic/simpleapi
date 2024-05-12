import { Injectable } from '@nestjs/common';
import { CreateI2cRelayDto } from './dto/create-i2c-relay.dto';
import { UpdateI2cRelayDto } from './dto/update-i2c-relay.dto';

@Injectable()
export class I2cRelayService {
  create(createI2cRelayDto: CreateI2cRelayDto) {
    return 'This action adds a new i2cRelay';
  }

  findAll() {
    return `This action returns all i2cRelay`;
  }

  findOne(id: number) {
    return `This action returns a #${id} i2cRelay`;
  }

  update(id: number, updateI2cRelayDto: UpdateI2cRelayDto) {
    return `This action updates a #${id} i2cRelay`;
  }

  remove(id: number) {
    return `This action removes a #${id} i2cRelay`;
  }
}
