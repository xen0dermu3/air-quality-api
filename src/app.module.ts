import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { validate } from './config/validate';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      envFilePath: `${process.cwd()}/${process.env.NODE_ENV}.env`,
      load: [appConfig],
      validate,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
