import { Module } from '@nestjs/common';
import { MathProviderService } from './math-provider.service';
import { MathProviderController } from './math-provider.controller';

@Module({
  providers: [MathProviderService],
  controllers: [MathProviderController]
})
export class MathProviderModule {}
