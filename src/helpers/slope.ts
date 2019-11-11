import { derivative as differentiate, evaluate } from 'mathjs';

export const evaluateAt = (func: string, x: number) => {
  try {
    return evaluate(func, { x });
  } catch {
    return NaN;
  }
}

export const fromString = (func: string) => (x: number) => evaluateAt(func, x);

export const derivative = (func: string) => {
  try {
    return differentiate(func, 'x').toString();
  } catch {
    return '';
  }
}

export const slope = (func: string, x0: number): string => {
  const f = fromString(func);
  const fDerivative = fromString(derivative(func));
  const value = f(x0);
  return (isFinite(value)) ? `${ value } + ${ fDerivative(x0) }(x - ${ x0 })` : ``;
}