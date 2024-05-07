import { Injectable } from '@nestjs/common';
import { CreateGpioRelayDto } from './dto/create-gpio-relay.dto';
import { UpdateGpioRelayDto } from './dto/update-gpio-relay.dto';

@Injectable()
export class GpioRelaysService {
  create(createGpioRelayDto: CreateGpioRelayDto) {
    return 'This action adds a new gpioRelay';
  }

  findAll() {
    return `This action returns all gpioRelays`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gpioRelay`;
  }

  update(id: number, updateGpioRelayDto: UpdateGpioRelayDto) {
    return `This action updates a #${id} gpioRelay`;
  }

  remove(id: number) {
    return `This action removes a #${id} gpioRelay`;
  }

  log(id: string) {

  }
}
