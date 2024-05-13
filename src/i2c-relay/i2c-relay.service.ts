import { Logger, Injectable } from '@nestjs/common';
import { CreateI2cRelayDto } from './dto/create-i2c-relay.dto';
import { UpdateI2cRelayDto } from './dto/update-i2c-relay.dto';

@Injectable()
export class I2cRelayService {

  private readonly logger = new Logger(I2cRelayService.name);

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
  
  read(): string {
    this.logger.log('Reading current status');
    return JSON.stringify({
      switchA: 'off',
      switchB: 'off',
      switchC: 'off',
      switchD: 'off'
    });
  }

  set(id: number, position: string): string {
    this.logger.log(`Switch ${id} ${position}`);
    return JSON.stringify({
      switchA: 'off',
      switchB: 'off',
      switchC: 'off',
      switchD: 'off'
    });
  }

  log(): void {
    const reading = this.read();
    console.log(reading);
    return 
  }
}
