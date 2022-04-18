import { evaluate } from 'mathjs'

export const operators: string[] = ['+','-','*', '/'];
export const parentheses: string[] = ['(',')'];
export const precedences = new Map([
  ['+',1],
  ['-',1],
  ['*',2],
  ['/',2],
  ['(',3],
  [')',3]
]);

export const evaluateInput = (input: Array<string>): string => {
  const valueStack: Array<string> = [];
  const operatorStack: Array<string> = [];

  for(const token of input) {
    if(token === '(') {
      operatorStack.push(token);
    } else if (token === ')') {
      while(operatorStack[operatorStack.length - 1] !== '(' && operatorStack.length) {
        const operator = operatorStack.pop();
        const oper1 = valueStack.pop();
        const oper2 = valueStack.pop();
        let expression = `${oper1}${operator}${oper2}`;
        if (operator === '/') {
          expression = `${oper2}${operator}${oper1}`;
        }
        const res = evaluate(expression);
        valueStack.push(res);
      }
      operatorStack.pop();
    } else if (operators.includes(token)) {
      while(operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(' && Number(precedences.get(operatorStack[operatorStack.length - 1])) >= Number(precedences.get(token))) {
        const operator = operatorStack.pop();
        const oper1 = valueStack.pop();
        const oper2 = valueStack.pop();
        let expression = `${oper1}${operator}${oper2}`;
        if (operator === '/') {
          expression = `${oper2}${operator}${oper1}`;
        }
        const res = evaluate(expression);
        valueStack.push(res);
      }
      operatorStack.push(token)
    } else {
      valueStack.push(token);
    }
  }

  while(operatorStack.length > 0) {
    const operator = operatorStack.pop();
    const oper1 = valueStack.pop();
    const oper2 = valueStack.pop();
    let expression = `${oper1}${operator}${oper2}`;
    if (operator === '/') {
      expression = `${oper2}${operator}${oper1}`;
    }
    const res = evaluate(expression);
    valueStack.push(res);
  }
  return valueStack.pop() || '';
}