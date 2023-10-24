import { Module } from '@nestjs/common';
import { IqairService } from './iqair.service';
import { IqairController } from './iqair.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [IqairService],
  controllers: [IqairController],
})
export class IqairModule {
}
