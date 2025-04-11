import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { EncuestasModule } from './modules/encuestas/encuestas.module';

@Module({
  imports: [
    EncuestasModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
  ],
})
export class AppModule {}
