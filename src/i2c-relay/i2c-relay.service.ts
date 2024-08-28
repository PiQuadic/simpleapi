import { Logger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateI2cRelayDto } from './dto/create-i2c-relay.dto';
import { UpdateI2cRelayDto } from './dto/update-i2c-relay.dto';
import { I2cRelay } from './entities/i2c-relay.entity';
import { I2cRelayReading } from './entities/i2c-relay-log.entity';

const i2c = require('i2c-bus');

type i2cFourSwitch = {
  A: string,
  B: string,
  C: string,
  D: string
}

@Injectable()
export class I2cRelayService {

  constructor(
    @InjectModel(I2cRelay)
    private I2cRelayDb: typeof I2cRelay,
  ) { }

  private readonly logger = new Logger(I2cRelayService.name);
  private readonly bus = i2c.openSync(1);
  private readonly ADDRESS = 0x27; // for this relay...
  private readonly defaultOff = {
    A: 'off',
    B: 'off',
    C: 'off',
    D: 'off',
  };

  sendByteToPCF8574(byte) {
    try {
      this.logger.log(`Byte ${byte.toString(2).padStart(8, '0')} sent to PCF8574`);
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

  setSwitches(switches: i2cFourSwitch): boolean {
    // for some reason this is reversed 
    let binAssembly = '';
    binAssembly = (switches.A == 'on') ? '0' : '1'
    binAssembly += (switches.B == 'on') ? '0' : '1'
    binAssembly += (switches.C == 'on') ? '0' : '1'
    binAssembly += (switches.D == 'on') ? '0' : '1'
    binAssembly += '0000'; // filler

    this.logger.log(`Bin Assembly: ${binAssembly}`);
    const switchCode = parseInt(binAssembly, 2);
    this.logger.log(`switchCode: ${switchCode}`);
    return this.sendByteToPCF8574(switchCode);
  };

  setI2cRelayPositionsAllOff() {
    const switches = {
      A: 'off',
      B: 'off',
      C: 'off',
      D: 'off'
    };
    // Sending 0xFF will set all IO pins to LOW
    // binaryRep '11110000' ALL off
    this.setSwitches(switches);
  };

  setI2cRelayPositionsAllOn() {
    const switches = {
      A: 'on',
      B: 'on',
      C: 'on',
      D: 'on'
    };
    // Sending 0xFF will set all IO pins to LOW
    // binaryRep '11110000' ALL off
    this.setSwitches(switches);
  };


  create(createI2cRelayDto: CreateI2cRelayDto) {
    return 'This action adds a new i2cRelay';
  }

  async findAll() {
    return this.I2cRelayDb.findAll();
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
    const curSwitches = this.defaultOff;
    databaseSwitches.map((sw) => {
      curSwitches[sw.relay_id] = sw.value;
    });
    this.logger.log(`current Switches ${JSON.stringify(curSwitches, null, 2)}`);

    // update the changed relay
    curSwitches[id] = updateI2cRelayDto?.value;
    this.logger.log(`id: ${id} to ${updateI2cRelayDto?.value}`);
    if (this.setSwitches(curSwitches)) {
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

  /*
  read(relay_id:string): Promise<I2cRelayReading> {
    return new Promise((resolve, reject) => {
      this.logger.log(`Reading current status: ${relay_id}`);
      // { relay_id: relay_id, name: 'switchA', value: 'on', dt: new Date() }
      const relay = { relay_id: relay_id, name: 'switchA', value: 'on', dt: new Date() };
      resolve(relay);
    });
  }

  //read_all(): Promise<I2cRelayReading[]> {
  read_all(): string {
    this.logger.log('Reading current status');
    return [
      { relay_id: '1', name: 'switchA', value: 1, dt: new Date() },
      { relay_id: '2', name: 'switchB', value: 0, dt: new Date() },
      { relay_id: '3', name: 'switchC', value: 0, dt: new Date() },
      { relay_id: '4', name: 'switchD', value: 0, dt: new Date() },
    ];
  }

  change(id: string, position: string): Promise<I2cRelayReading>{
    this.logger.log(`Switch ${id} ${position}`);
    return JSON.stringify({
      switchA: 'off',
      switchB: 'off',
      switchC: 'off',
      switchD: 'off'
    });
  }

  log(): Promise<I2cRelayReading[]> {
    const readings = this.read_all();
    console.log(readings);
    return readings;
  }
 */
}
