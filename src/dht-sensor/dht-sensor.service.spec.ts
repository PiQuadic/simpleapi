import { Test, TestingModule } from '@nestjs/testing';
import { DhtSensorService } from './dht-sensor.service';

describe('DhtSensorService', () => {
  let service: DhtSensorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DhtSensorService],
    }).compile();

    service = module.get<DhtSensorService>(DhtSensorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
