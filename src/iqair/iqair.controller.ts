import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosError } from 'axios';
import { Root } from './interfaces';

@Controller('iqair')
export class IqairController {
  constructor(private readonly configService: ConfigService<{
    app: {
      iqair: {
        url: string;
        key: string
      }
    }
  }>, private readonly httpService: HttpService) {
  }

  @Get('nearest-city-air-quality')
  async getAirQualityOfNearestCity(@Query('longitude') longitude: string, @Query('latitude') latitude: string) {
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

    return this.generateResponse(data);
  }

  private generateQueryString(params: Record<string, string>) {
    return Object
      .keys(params)
      .map(param => params[param] ? `${param}=${params[param]}` : undefined)
      .filter(Boolean)
      .join('&');
  }

  private generateResponse(data: Root) {
    const pollution = data?.data?.current?.pollution;

    return {
      'Result': {
        'Pollution': {
          ts: pollution?.ts,
          aqius: pollution?.aqius,
          mainus: pollution?.mainus,
          maincn: pollution?.maincn,
        },
      },
    };
  }
}
