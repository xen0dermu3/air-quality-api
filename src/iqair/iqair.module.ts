import { Module } from '@nestjs/common';
import { IqairService } from './iqair.service';
import { IqairController } from './iqair.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '../prisma/prisma.module';
import { IqairRepository } from './iqair.repository';

@Module({
  imports: [ConfigModule, HttpModule, PrismaModule],
  providers: [IqairService, IqairRepository],
  controllers: [IqairController],
})
export class IqairModule {
}
