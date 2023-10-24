import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateIqairDto } from './dto/create-iqair.dto';
import { Prisma } from '@prisma/client';
import { Root } from './interfaces';

@Injectable()
export class IqairRepository {
  constructor(private readonly prismaService: PrismaService) {

  }

  async create(createIqairDto: CreateIqairDto) {
    const data: Prisma.IqairLogsCreateInput = {
      data: createIqairDto.data as unknown as Prisma.InputJsonValue,
      coordinates: createIqairDto.coordinates,
    };

    return this.prismaService.iqairLogs.create({
      data,
    });
  }

  async findOneByDataIsMostPolluted() {
    return this.prismaService.$queryRaw<{
      id: string,
      createdAt: Date,
      updatedAt: Date,
      coordinates: {
        latitude: string;
        longitude: string;
      },
      data: Root,
      aqius: number
    }[]>(Prisma.sql`select *, data -> 'data' -> 'current' -> 'pollution' ->> 'aqius' as aqius
                  from iqair_logs
                  where data -> 'data' -> 'current' -> 'pollution' ->> 'aqius' =
                      (select max(data -> 'data' -> 'current' -> 'pollution' ->> 'aqius') from iqair_logs)
                  order by created_at desc limit 1`);
  }
}