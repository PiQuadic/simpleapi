import { Test, TestingModule } from '@nestjs/testing';
import { I2cRelayService } from './i2c-relay.service';

describe('I2cRelayService', () => {
  let service: I2cRelayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [I2cRelayService],
    }).compile();

    service = module.get<I2cRelayService>(I2cRelayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
