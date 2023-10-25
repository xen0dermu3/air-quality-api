import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { IqairService } from './iqair.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('iqair')
@ApiTags('iqair')
export class IqairController {
  constructor(private readonly iqairService: IqairService) {
  }

  @Get('nearest-city-air-quality')
  @ApiQuery({ name: 'longitude', required: false, type: String, example: '2.352222' })
  @ApiQuery({ name: 'latitude', required: false, type: String, example: '48.856613' })
  async getAirQualityOfNearestCity(@Query('longitude') longitude?: string, @Query('latitude') latitude?: string) {
    const data = await this.iqairService.getAirQualityOfNearestCity(latitude, longitude);

    const pollution = data?.data?.current?.pollution;

    return {
      'Result': {
        'Pollution': {
          ts: pollution?.ts ?? '',
          aqius: pollution?.aqius ?? '',
          mainus: pollution?.mainus ?? '',
          maincn: pollution?.maincn ?? '',
        },
      },
    };
  }

  @Get('paris-most-polluted-datetime')
  async getDatetimeWhereParisZoneIsMostPolluted() {
    const result = (await this.iqairService.getDatetimeWhereParisZoneIsMostPolluted())?.[0];

    if (!result) {
      throw new NotFoundException('No data about pollution for Paris yet');
    }

    return {
      datetime: result?.data?.data?.current?.pollution?.ts,
      aqius: result?.aqius,
    };
  }
}
