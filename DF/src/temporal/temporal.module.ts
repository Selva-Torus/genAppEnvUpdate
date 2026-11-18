import { Global, Module } from '@nestjs/common';
import { TemporalController } from './temporal.controller';
import { TemporalService } from './temporal.service';
import { temporalProviders } from './temporal.providers';

// Global so DynamicFlowService (TeModule) can inject TemporalService
@Global()
@Module({
  controllers: [TemporalController],
  providers: [...temporalProviders, TemporalService],
  exports: [TemporalService],
})
export class TemporalModule {}
