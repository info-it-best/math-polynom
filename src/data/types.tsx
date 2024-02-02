//"Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements; and to You under the Apache License, Version 2.0. "

export type MathOperation = 'exponent' | 'kordano';

export type MathOperationResult = {
    goal: string
    result: string
    duration: number
}

export type MathProvider = "mathjs" | "igorm"

export type MathFields = {
    varNames: string[]
    exp: number
    op: MathOperation
    mathProvider: MathProvider
};

export class MathResultsData {
    isLoading: boolean = false;
    success: boolean  =false;
    result: MathOperationResult | undefined;
    error: Error | undefined;
    constructor(isLoading: boolean, success: boolean, 
        result: MathOperationResult | undefined, error: Error | undefined) {
        this.isLoading = isLoading;
        this.success = success;
        this.result = result;
        this.error = error;
    }
    static buildDefaut() {
        return new MathResultsData(false, false, undefined, undefined);
    }
    static buildLoading() {
        return new MathResultsData(true, false, undefined, undefined);
    }
    static buildSuccess(result: MathOperationResult) {
        return new MathResultsData(false, true, result, undefined);
    }
    static buildFailure(error: Error) {
        return new MathResultsData(false, false, undefined, error);
    }
}

export function extractVarNamesFrom(varList: string): string[] {
    return varList.split(" ").join("").split(",").filter(s => s)
}

export function validateVarList(varList: string) {
    if (!varList) return "List of variable names is required"
    const varNames = extractVarNamesFrom(varList);
    if (varNames.length < 2 || varNames.length > 5) return "Number of variable names should be between 2 and 5"
    const badLengthVarNames = varNames.filter(s => s.length > 6)
    if (badLengthVarNames.length) return "Variable name length cannot be more than 5 symbols"
    const badFormatMessages = varNames.map(s => {
      if (s.search(/[a-zA-Z]+/)!=0) return  `Variable name ${s} should start with a-z or A-Z`
      if (s.length == 1) return false;
      const tail = s.substring(1);
      if (tail.match(/[0-9]/g)?.length != tail.length) return `${s} should have 1st symbol and more then 5 numbers`
      return false;
    }).filter(s => s)
    if (badFormatMessages.length) return badFormatMessages.join("\n")
    return true;
  }
