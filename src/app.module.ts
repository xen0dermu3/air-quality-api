import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { validate } from './config/validate';
import { PrismaModule } from './prisma/prisma.module';
import { IqairModule } from './core/iqair/iqair.module';
import databaseConfig from './config/database.config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      envFilePath: `${process.cwd()}/${process.env.NODE_ENV}.env`,
      load: [appConfig, databaseConfig],
      validate,
    }),
    IqairModule,
    ScheduleModule.forRoot(),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
