import type { NextPage } from 'next'
import { useState } from 'react'
import { evaluate } from 'mathjs'

const operators = ['+','-','*', '/'];
const parentheses = ['(',')'];
const precedences = new Map([
  ['+',1],
  ['-',1],
  ['*',2],
  ['/',2],
  ['(',3],
  [')',3]
]);

const evaluateInput = (input: Array<string>): string => {
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
      while(operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(' && precedences.get(operatorStack[operatorStack.length - 1]) >= precedences.get(token)) {
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

const Home: NextPage = () => {
  const [input, setInput] = useState('');
  return (
    <main>
      <div className='calculator'>
        <div className='screen'>{input}</div>
        <div className='keyboard'>
          {[1,2,3,4,5,6,7,8,9,0].map(number => <button value={number} onClick={() => setInput(`${input}${number}`)} key={number}>{number}</button>)}
          {operators.map((symbol,index) => <button onClick={() => {
            setInput(`${input} ${symbol} `)
          }} key={index}>{symbol}</button>)}
          <button value={'='} onClick={() => setInput(evaluateInput(input.split(' ')))}>=</button>
          {parentheses.map((paren, index) => <button onClick={() => setInput( paren === '(' ? `${input}${paren} ` : `${input} ${paren}` )} key={index}>{paren}</button>)}
          <button value={'C'} onClick={() => setInput('')}>C</button>
        </div>
      </div>
    </main>
  )
}

export default Home
