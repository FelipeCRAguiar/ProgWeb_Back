import { Test, TestingModule } from '@nestjs/testing';
import { AdoptionController } from './adoption.controller.js';
import { AdoptionService } from './adoption.service.js';

describe('AdoptionController', () => {
  let controller: AdoptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdoptionController],
      providers: [AdoptionService],
    }).compile();

    controller = module.get<AdoptionController>(AdoptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
