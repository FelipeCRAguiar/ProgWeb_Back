import { Test, TestingModule } from '@nestjs/testing';
import { ShelterController } from './shelter.controller.js';
import { ShelterService } from './shelter.service.js';

describe('ShelterController', () => {
  let controller: ShelterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShelterController],
      providers: [ShelterService],
    }).compile();

    controller = module.get<ShelterController>(ShelterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
