//"Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements; and to You under the Apache License, Version 2.0. "

import { MathFields, MathOperationResult } from '../data/types'
import { simplify, rationalize } from 'mathjs'

interface OperationsFactory {
    exponent: (op: MathFields) => Promise<MathOperationResult>;
    kordano: (op: MathFields) => Promise<MathOperationResult>;
}

interface MathProviderFactory {
    mathjs: OperationsFactory
    igorm: OperationsFactory
}

const mathjsFactory: OperationsFactory = {
    exponent: async ({exp, varNames}) => {
        const startedAt = Date.now()
        if (exp == 5 || varNames.length == 5 || exp>2 && varNames.length > 2) 
            throw new Error("We are sorry, but mathjs provider works very slow for this configuration")
        const goalBase = `(${varNames.join(" + ")})`;
        const goal = `(${varNames.join(" + ")})^${exp}`;
        let g = goalBase;
        for (let i=1; i< exp; i++) g += "*" + goalBase
        return {
            goal,
            result: simplify(rationalize(g).toString()).toString(),
            duration: Date.now() - startedAt,
        }
    },
    kordano: async ({exp, varNames}) => {
        const startedAt = Date.now()
        if (exp != 3 || varNames.length != 3) throw new Error(`Kordano is only implemented for 3 variabls for exponent 3`);
        function build11() {
            return varNames.flatMap((vn,i) => varNames.filter((vn2,i2) => i<i2 && vn2 != vn).map(vn2 => vn+vn2));
        }
        function pow(e: number) {
            return varNames.map(vn => `${vn}^${e}`);
        }
        return {
            goal: `${pow(3).join(" + ")} - 3*${varNames.join("*")}`,
            result: `(${varNames.join(" + ")}) * (${pow(2).join(" + ")} - ${build11().join(" - ")})`,
            duration: Date.now() - startedAt,
        }
    },
}

const igormFactory: OperationsFactory = {
    exponent: async ({exp, varNames}) => {
        throw new Error("Sorry this method is being developed");
    },
    kordano: async ({exp, varNames}) => {
        throw new Error("Sorry this method is being developed");
    },
}

const mathProviderFactory: MathProviderFactory = {
    mathjs: mathjsFactory, igorm: igormFactory
}

export default class MathService {
    static async performOperation(op: MathFields): Promise<MathOperationResult> {
        const handler = mathProviderFactory[op.mathProvider][op.op];
        if (!handler) throw new Error(
            `Not implemented operation ${op.op}. Supported: ${Object.keys(mathProviderFactory[op.mathProvider]).join(",")}`
        );
        return await handler(op);
    }
}