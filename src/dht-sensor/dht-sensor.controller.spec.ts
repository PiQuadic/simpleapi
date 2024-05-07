import { Test, TestingModule } from '@nestjs/testing';
import { DhtSensorController } from './dht-sensor.controller';

describe('DhtSensorController', () => {
  let controller: DhtSensorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DhtSensorController],
    }).compile();

    controller = module.get<DhtSensorController>(DhtSensorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
