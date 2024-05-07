import { Test, TestingModule } from '@nestjs/testing';
import { GpioRelaysService } from './gpio-relays.service';

describe('GpioRelaysService', () => {
  let service: GpioRelaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GpioRelaysService],
    }).compile();

    service = module.get<GpioRelaysService>(GpioRelaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
