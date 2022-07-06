export enum CalculationResultType {
    ADDITION,
    SUBTRACTION,
    MULTIPLICATION,
    DIVISION
};

export interface Calculation
{
    type: CalculationResultType,
    a: Number,
    b: Number,
    result?: Number
};