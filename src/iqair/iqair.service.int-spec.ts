import { Test, TestingModule } from '@nestjs/testing';
import { IqairService } from './iqair.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { IqairRepository } from './iqair.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('IqairService', () => {
  let service: IqairService;
  let repository: IqairRepository;
  let date = new Date().toISOString();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ConfigService, {
        provide: PrismaService,
        useValue: {
          iqairLogs: {
            create: () => ({
              id: '64664f3e-527c-4af0-acc2-781cd6e6ab80',
              createdAt: date,
              updatedAt: date,
              coordinates: '',
              data: {},
            }),
          },
          $queryRaw: () => ([
            {
              id: '64664f3e-527c-4af0-acc2-781cd6e6ab80',
              createdAt: date,
              updatedAt: date,
              coordinates: {
                latitude: '',
                longitude: '',
              },
              data: {},
              aqius: 11,
            },
          ]),
        },
      }, IqairService, IqairRepository],
    }).compile();

    service = module.get<IqairService>(IqairService);
    repository = module.get(IqairRepository);
  });

  it('should call repository method', async () => {
    expect(await repository.create({ data: {} as any, coordinates: { latitude: '', longitude: '' } })).toStrictEqual({
      'coordinates': '',
      'createdAt': date,
      'data': {},
      'id': '64664f3e-527c-4af0-acc2-781cd6e6ab80',
      'updatedAt': date,
    });
  });

  it('should get datetime when Paris is most polluted', async () => {
    expect(await service.getDatetimeWhereParisZoneIsMostPolluted()).toStrictEqual([
      {
        id: '64664f3e-527c-4af0-acc2-781cd6e6ab80',
        createdAt: date,
        updatedAt: date,
        coordinates: {
          latitude: '',
          longitude: '',
        },
        data: {},
        aqius: 11,
      },
    ]);
  });
});
