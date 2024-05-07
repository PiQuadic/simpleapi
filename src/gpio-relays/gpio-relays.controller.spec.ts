import { Test, TestingModule } from '@nestjs/testing';
import { GpioRelaysController } from './gpio-relays.controller';
import { GpioRelaysService } from './gpio-relays.service';

describe('GpioRelaysController', () => {
  let controller: GpioRelaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GpioRelaysController],
      providers: [GpioRelaysService],
    }).compile();

    controller = module.get<GpioRelaysController>(GpioRelaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
