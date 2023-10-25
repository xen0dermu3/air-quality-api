import { Test, TestingModule } from '@nestjs/testing';
import { IqairService } from './iqair.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { IqairRepository } from './iqair.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('IqairService', () => {
  let service: IqairService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ConfigService, PrismaService, IqairService, IqairRepository],
    }).compile();

    service = module.get<IqairService>(IqairService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
