import React, { useState, useCallback, useRef } from 'react';
import '../styles/Calculator.scss';
import Tr from './Tr';

const Calculator = () => {
  const [path, setPath] = useState('');
  const [number, setNumber] = useState('0');
  const stack = useRef([]);
  const isOperClicked = useRef(false);

  const contents = [
    ['1','2','3','+'],
    ['4','5','6','-'],
    ['7','8','9','x'],
    ['','0','','/'],
    ['C','','←','=']
  ];
  const operators = ['+', '-', 'x', '/'];

  const onClickButton = useCallback((value) => {
    if(Number.isInteger(parseInt(value))) {
      if(isOperClicked.current) {
        setNumber(value);
        isOperClicked.current = false;
      } else {
        const newNumber = (number === '0' ? value : number + value);
        setNumber(newNumber);
      }
    } else if(operators.includes(value)) {
      if(stack.length && operators.includes.stack[stack.length-1])
        return;
      let newPath = '';
      stack.current.push(number);
      stack.current.push(value);
      stack.current.forEach((val) => newPath += (val + ' '));
      isOperClicked.current = true;
      console.log(newPath);
      setPath(newPath);
    } else if(value === '←') {
      const newNumber = number.substring(0, number.length-1);
      setNumber(newNumber);
    } else if(value === 'C') {
      setNumber('0');
      stack.current = [];
    } else if(value === '=') {
      stack.current.push(number);
      let ans = 0, oper = '';
      stack.current.forEach((val) => {
        if(operators.includes(val)) oper = val;
        else {
          val = parseInt(val);
          switch(oper) {
            case '': ans = val; break;
            case '+': ans += val; break;
            case '-': ans -= val; break;
            case '*': ans *= val; break;
            case '/': ans /= val; break;
            default: throw new Error('Invalid');
          }
        }
      });
      setNumber(ans);
      stack.current = [];
    }
  }, [number, operators]);

  return (
    <table>
      <thead>
        <tr>
          <th className="path" colSpan="4">
            {path}
          </th>
        </tr>
        <tr>
          <th colSpan="4">{number}</th>
        </tr>
      </thead>
      <tbody>
        {contents.map((cols) => 
          <Tr key={cols.toString()} cols={cols} handler={onClickButton} />)}
      </tbody>
    </table>
  );
}

export default Calculator;