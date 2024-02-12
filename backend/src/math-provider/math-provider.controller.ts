import { Body, Controller, Post } from '@nestjs/common';
import { MathProviderService } from './math-provider.service'
import { MathFields, MathOperationResult } from './../types'

@Controller('math-provider')
export class MathProviderController {

    constructor(private mathProviderService: MathProviderService) {}

    @Post('exponent')
    async exponent(@Body() dto: MathFields): Promise<MathOperationResult> {
        return await this.mathProviderService.exponent(dto);
    }
    
    @Post('kordano-build')
    kordanoBuild(@Body() dto: MathFields) {
        return this.mathProviderService.kordanoBuild(dto);
    }
}
