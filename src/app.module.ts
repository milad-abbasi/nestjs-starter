import { Global, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env',
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          level: configService.get<string>('LOG_LEVEL', 'debug'),
          prettyPrint:
            configService.get<string>('LOG_PRETTY', 'true') === 'true',
        },
      }),
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: (): ValidationPipe => {
        return new ValidationPipe({
          transform: true,
          whitelist: true,
        });
      },
    },
  ],
})
export class AppModule {}
