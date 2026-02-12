import { Global, Module } from '@nestjs/common';
import { EnvData } from './EnvData.service';

@Global()
@Module({
  providers: [EnvData],
  exports: [EnvData],
})
export class EnvDataModule {}