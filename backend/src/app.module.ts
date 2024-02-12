import { Module } from '@nestjs/common';
import { MathProviderModule } from './math-provider/math-provider.module';

@Module({
  imports: [MathProviderModule],
})
export class AppModule {}
