import { Logger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateI2cRelayDto, RelayPosition } from './dto/update-i2c-relay.dto';
import { I2cRelay } from './entities/i2c-relay.entity';

const i2c = require('i2c-bus');

type i2cFourSwitch = {
  relay_id: string,
  position: string,
};

@Injectable()
export class I2cRelayService {

  constructor(
    @InjectModel(I2cRelay)
    private I2cRelayDb: typeof I2cRelay,
  ) { }

  private readonly padding = Array(4).fill(0);
  private readonly logger = new Logger(I2cRelayService.name);
  private readonly bus = i2c.openSync(1);
  private readonly ADDRESS = 0x27; // for this relay...
  private readonly defaultOff = [
    '1', // 'off' for a NORMALY OPEN relay
    '1',
    '1',
    '1',
    ...this.padding
  ];

  sendByteToPCF8574(byte) {
    try {
      this.logger.log(`Byte ${byte.toString(2)} sent to PCF8574`);
      this.bus.writeByteSync(this.ADDRESS, 0x00, byte);
      this.bus.closeSync();
      return true;
    } catch (err) {
      this.logger.log(err);
      this.bus.closeSync();
      return false;
    }
    // Close the I2C bus after finishing
  }

  setSwitches(switches): boolean {
    switches.push(this.padding);
    const binAssembly = switches.join('');

    this.logger.log(`Bin Assembly: ${binAssembly}`);
    const switchCode = parseInt(binAssembly, 2);
    this.logger.log(`switchCode: ${switchCode}`);
    return true;
    return this.sendByteToPCF8574(switchCode);
  };

  setI2cRelayPositionsAllOff() {
    const switches = [
      '1', // 1 = off for a NORMALLY OPEN relay
      '1',
      '1',
      '1',
      ...this.padding
    ];
    // Sending 0xFF will set all IO pins to LOW
    // binaryRep '11110000' ALL off
    this.setSwitches(switches);
  };

  setI2cRelayPositionsAllOn() {
    const switches = [
      '0', // 1 = off for a NORMALLY OPEN relay
      '0',
      '0',
      '0',
      ...this.padding
    ];
    // binaryRep '00000000' ALL off
    this.setSwitches(switches);
  };


  async findAll(): Promise<I2cRelay[]> {
    return this.I2cRelayDb.findAll({ order: [['relay_id', 'ASC']] });
  }

  async findOne(id: string): Promise<I2cRelay> {
    return await this.I2cRelayDb.findOne({
      where: {
        relay_id: id
      }
    });
  }

  async update(id: string, updateI2cRelayDto: UpdateI2cRelayDto) {
    this.logger.log(`Update ${id} with:`);
    this.logger.log(updateI2cRelayDto);
    const databaseSwitches = await this.findAll();
    // init switch setup
    const newSwitchSettings = databaseSwitches.map((sw) => {
      return (sw.relay_id === id && sw.enabled === 1) ?
        { ...sw, ...updateI2cRelayDto } :
        sw
    });
    // update the changed relay
    const updateSettings = newSwitchSettings.map((sw) => sw.position);
    if (this.setSwitches(updateSettings)) {
      return await this.I2cRelayDb.update(
        updateI2cRelayDto,
        {
          where: { relay_id: id }
        }
      );
    }
    this.logger.log("ERROR in setting switches");
    return false;
  }

  remove(id: string) {
    return `This action removes a #${id} i2cRelay`;
  }

}
