import type { NextPage } from 'next'
import { useState } from 'react'
import {operators, parentheses, evaluateInput} from '../lib/arithmetic'

const Home: NextPage = () => {
  const [input, setInput] = useState('');
  return (
    <main>
      <div className='calculator'>
        <div className='screen'>{input}</div>
        <div className='keyboard'>
          {[1,2,3,4,5,6,7,8,9,0].map(number => <button value={number} onClick={() => setInput(`${input}${number}`)} key={number}>{number}</button>)}
          {operators.map((symbol,index) => <button value={symbol} onClick={() => {
            setInput(`${input} ${symbol} `)
          }} key={index}>{symbol}</button>)}
          <button value={'='} onClick={() => setInput(evaluateInput(input.split(' ')))}>=</button>
          {parentheses.map((paren, index) => <button value={paren} onClick={() => setInput( paren === '(' ? `${input}${paren} ` : `${input} ${paren}` )} key={index}>{paren}</button>)}
          <button value={'C'} onClick={() => setInput('')}>C</button>
        </div>
      </div>
    </main>
  )
}

export default Home
