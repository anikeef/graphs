import { derivative, evaluate } from 'mathjs';

const fromString = (func: string) => (x: number) => evaluate(func, { x });

export const slope = (func: string, x0: number): string => {
  const f = fromString(func);
  const fDerivative = fromString(derivative(func, 'x').toString());
  return `${ f(x0) } + ${ fDerivative(x0) }(x - ${ x0 })`;
}