import { BadRequestException, Injectable, NotImplementedException, ServiceUnavailableException } from '@nestjs/common';
import { MathFields, MathOperationResult } from '../types';
import { Variable, Single, Many } from '../single';

@Injectable({})
export class MathProviderService {

    private timer: any = undefined;

    private async debounce<T>(callback: () => T, timeout: number): Promise<T | undefined> {
        if (this.timer) return undefined;
        let timeoutCleared = false;
        let operationComplete = false;
        this.timer = setTimeout(() => {
            console.log("Timer triggered!");
            clearTimeout(this.timer);
            timeoutCleared = true;
            if (operationComplete) {
                console.log("Timer unset by setTimeout")
                this.timer = undefined;
            }
        }, timeout);
        const result = callback();
        operationComplete = true;
        if (timeoutCleared) {
            console.log("Timer unset by debounce")
            this.timer = undefined;
        }
        return result;
    }

    async exponent({varNames, exp}: MathFields): Promise<MathOperationResult> {
        if ((exp < 2 || exp > 5) || (varNames.length < 2 || varNames.length > 5)) {
            throw new BadRequestException("igorm math provider does not support exp or varNames outside of range 2..5");
        }
        console.log(`varNames: ${varNames}, exp: ${exp}`);
        const result =  await this.debounce((): MathOperationResult => {
            const startedAt = Date.now();
            const polynomial = new Many(varNames.map(vn => new Variable(vn)).map(v => new Single([v])));
            const goal = `(${polynomial.toString()}) ^ ${exp}`;
            const result = polynomial.pow(exp).toString();
            const duration = Date.now() - startedAt;
            return { goal, result, duration };
        }, 2000);
        if (!result) throw new ServiceUnavailableException("igorm math provider exponent can trigger only less frequent than 2 sec");
        return result;
    }

    kordanoBuild(dto: MathFields) {
        throw new NotImplementedException("igorm currently does not support Kordano Build feature");
    }
}
