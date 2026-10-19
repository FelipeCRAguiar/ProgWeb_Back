import { Test, TestingModule } from '@nestjs/testing';
import { AnimalsController } from './animals.controller.js';
import { AnimalsService } from './animals.service.js';

describe('AnimalsController', () => {
  let controller: AnimalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalsController],
      providers: [AnimalsService],
    }).compile();

    controller = module.get<AnimalsController>(AnimalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
