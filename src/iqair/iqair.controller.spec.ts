import { Test, TestingModule } from '@nestjs/testing';
import { IqairController } from './iqair.controller';
import { IqairService } from './iqair.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { IqairRepository } from './iqair.repository';
import { PrismaService } from '../prisma/prisma.service';
import { of } from 'rxjs';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('IqairController', () => {
  let controller: IqairController;
  let httpService: jest.Mocked<HttpService>;
  let date = Date.now().toLocaleString();
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [HttpModule],
      controllers: [IqairController],
      providers: [{
        provide: PrismaService,
        useValue: {},
      }, {
        provide: HttpService,
        useValue: {
          get: jest.fn(),
        },
      }, ConfigService, IqairService, IqairRepository],
    })
      .compile();

    controller = module.get<IqairController>(IqairController);
    httpService = module.get<jest.Mocked<HttpService>>(HttpService);

    app = module.createNestApplication();

    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get nearest city air quality', async () => {
    jest.spyOn(httpService, 'get').mockImplementation(() => of({
      data: {
        status: 'success',
        data: {
          current: {
            pollution: {
              ts: date,
              aqius: 10,
              aqicn: 10,
              mainus: '',
              maincn: '',
            },
          },
        },
      },
    }) as any);

    expect(await controller.getAirQualityOfNearestCity()).toStrictEqual({
      'Result': {
        'Pollution': {
          ts: date,
          aqius: 10,
          aqicn: 10,
          mainus: '',
          maincn: '',
        },
      },
    });
  });

  it('should throw error', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of({
      data: {
        status: 'error',
      },
    }) as any);

    return request(app.getHttpServer())
      .get('/iqair/nearest-city-air-quality')
      .expect((response) => {
        expect(response.body).toStrictEqual({
            message: 'Got status = "error" from API',
            error: 'Bad Request',
            statusCode: 400,
          },
        );
      });
  });
});