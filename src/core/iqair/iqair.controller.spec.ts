import { Test, TestingModule } from '@nestjs/testing';
import { IqairController } from './iqair.controller';

describe('IqairController', () => {
  let controller: IqairController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IqairController],
    }).compile();

    controller = module.get<IqairController>(IqairController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
