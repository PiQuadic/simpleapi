import { Test, TestingModule } from '@nestjs/testing';
import { I2cRelayController } from './i2c-relay.controller';
import { I2cRelayService } from './i2c-relay.service';

describe('I2cRelayController', () => {
  let controller: I2cRelayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [I2cRelayController],
      providers: [I2cRelayService],
    }).compile();

    controller = module.get<I2cRelayController>(I2cRelayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
