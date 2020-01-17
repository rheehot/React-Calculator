import React, { useState, useCallback, useRef } from 'react';
import '../styles/Calculator.scss';
import Tr from './Tr';

const Calculator = () => {
  const [path, setPath] = useState('');
  const [number, setNumber] = useState('0');

  const numbers = useRef([]);
  const stack = useRef([]);
  const isOperClicked = useRef(false);
  const isNumberClicked = useRef(false);

  const PLUS = '+';
  const MINUS = '-';
  const MULTIPLICATION = String.fromCharCode('0x00D7');
  const DIVISION = String.fromCharCode('0x00F7');

  const contents = [
    ['1','2','3',PLUS],
    ['4','5','6',MINUS],
    ['7','8','9',MULTIPLICATION],
    ['','0','',DIVISION],
    ['C','','←','=']
  ];
  const operators = [PLUS, MINUS, MULTIPLICATION, DIVISION];

  const calculate = () => {
    while(stack.current.length) {
      const num2 = numbers.current.pop()*1;
      const num1 = numbers.current.pop()*1;
      const oper = stack.current.pop();
      let result = 0;
      switch (oper) {
        case PLUS: result = num1 + num2; break;
        case MINUS: result = num1 - num2; break;
        case MULTIPLICATION: result = num1 * num2; break;
        case DIVISION: result = num1 / num2; break;
        default: throw new Error('Invalid');
      }
      numbers.current.push(result);
    }
  };

  const isLowerPrecedence = (oper) => {
    if(stack.current.length === 0) return false;
    const last = stack.current[stack.current.length-1];
    if(oper === MULTIPLICATION && (last === MINUS || last === PLUS)) return false;
    if(oper === DIVISION && (last === MINUS || last === PLUS)) return false;
    return true;
  };

  const onClickButton = useCallback((value) => {
    if(Number.isInteger(parseInt(value))) {
      if(isOperClicked.current) {
        setNumber(value);
      } else if(path[path.length-1] === '=') {
        setPath('');
        setNumber(value);
      } else {
        const newNumber = (number === '0' ? value : number + value);
        setNumber(newNumber);
      }
      isNumberClicked.current = true;
      isOperClicked.current = false;
    } else if(operators.includes(value)) {
      if(!isNumberClicked.current && stack.current.length === 0) return;
      else if(isOperClicked.current) return;
      numbers.current.push(number);
      if(isLowerPrecedence(value)) {
        calculate();
      }
      stack.current.push(value);
      isOperClicked.current = true;
      isNumberClicked.current = false;

      if(path[path.length-1] === '=') {
        setPath(number + value);
      } else {
        setPath(path + number + value);
      }
    } else if(value === '←') {
      if(isOperClicked.current) return;
      let newNumber = '';
      if(number.length === 1) {
        newNumber = 0;
      } else {
        newNumber = number.substring(0, number.length-1);
      }
      isOperClicked.current = true;
      setNumber(newNumber);
    } else if(value === 'C') {
      setNumber('0');
      setPath('');
      numbers.current = [];
      stack.current = [];
      isNumberClicked.current = false;
      isOperClicked.current = false;
    } else if(value === '=') {
      if(!isNumberClicked.current) return;
      numbers.current.push(number);
      calculate();
      setPath(path + number + value);
      setNumber(numbers.current[numbers.current.length-1]);
    }
  }, [number, operators, path]);

  return (
    <div className="container">
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
    </div>
  );
}

export default Calculator;