import { Test, TestingModule } from '@nestjs/testing';
import { IqairService } from './iqair.service';

describe('IqairService', () => {
  let service: IqairService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IqairService],
    }).compile();

    service = module.get<IqairService>(IqairService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
