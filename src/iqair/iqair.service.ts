import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { Root } from './interfaces';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosError } from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IqairRepository } from './iqair.repository';

@Injectable()
export class IqairService {
  private readonly logger = new Logger(IqairService.name);

  constructor(private readonly configService: ConfigService<{
    app: {
      iqair: {
        url: string;
        key: string
      }
    }
  }>, private readonly httpService: HttpService, private readonly iqairRepository: IqairRepository) {
  }

  async getAirQualityOfNearestCity(latitude?: string, longitude?: string) {
    const apiUrl = this.configService.get('app.iqair.url', { infer: true })!;
    const apiKey = this.configService.get('app.iqair.key', { infer: true })!;
    const nearestCityUrl = '/v2/nearest_city';
    const queryString = this.generateQueryString({
      lat: latitude,
      lon: longitude,
      key: apiKey,
    });

    const { data } = await firstValueFrom(
      this.httpService.get<Root>(`${apiUrl}${nearestCityUrl}?${queryString}`).pipe(
        catchError((error: AxiosError) => {
          throw new BadRequestException('Something bad happened', {
            cause: error,
            description: error.message,
          });
        }),
      ),
    );

    if (data.status !== 'success') {
      throw new BadRequestException(`Got status = "${data.status}" from API`);
    }

    return data;
  }

  async getDatetimeWhereParisZoneIsMostPolluted() {
    return this.iqairRepository.findOneByDataIsMostPolluted();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const parisCoordinates = {
      latitude: '48.856613',
      longitude: '2.352222',
    };

    const data = await this.getAirQualityOfNearestCity(parisCoordinates.latitude, parisCoordinates.longitude);

    const iqairLog = await this.iqairRepository.create({
      coordinates: {
        latitude: parisCoordinates.latitude,
        longitude: parisCoordinates.longitude,
      },
      data,
    });

    this.logger.verbose(`CRON: Response from IQAir got, status = "${data.status}"; saved in database, id = "${iqairLog.id}"`);
  }

  private generateQueryString(params: Record<string, string | undefined>) {
    return Object
      .keys(params)
      .map(param => params[param] ? `${param}=${params[param]}` : undefined)
      .filter(Boolean)
      .join('&');
  }
}
