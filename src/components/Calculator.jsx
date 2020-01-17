import React, { useState, useCallback, useRef } from 'react';
import '../styles/Calculator.scss';
import { contents } from '../constants';
import * as Calculate from '../logics/calculate';
import Tr from './Tr';

const Calculator = () => {
  const [path, setPath] = useState('');
  const [number, setNumber] = useState('0');

  const isOperClicked = useRef(false);
  const isNumberClicked = useRef(false);


  const onClickButton = useCallback((clicked) => {
    if(Calculate.isNumber(clicked)) {
      if(isOperClicked.current) {
        setNumber(clicked);
      } else if(path[path.length-1] === '=') {
        setPath('');
        setNumber(clicked);
      } else {
        const newNumber = (number === '0' ? clicked : number + clicked);
        setNumber(newNumber);
      }
      isNumberClicked.current = true;
      isOperClicked.current = false;
    } else if(Calculate.isOperator(clicked)) {
      if(!isNumberClicked.current && Calculate.operatorStack.length === 0) return;
      else if(isOperClicked.current) return;
      Calculate.numberArray.current.push(number);
      if(Calculate.isLowerPrecedence(clicked)) {
        Calculate.calculateTillNow();
      }
      Calculate.operatorStack.push(clicked);
      isOperClicked.current = true;
      isNumberClicked.current = false;

      if(path[path.length-1] === '=') {
        setPath(number + clicked);
      } else {
        setPath(path + number + clicked);
      }
    } else if(Calculate.isErase(clicked)) {
      if(isOperClicked.current) return;
      let newNumber = '';
      if(number.length === 1) {
        newNumber = 0;
      } else {
        newNumber = number.substring(0, number.length-1);
      }
      isOperClicked.current = true;
      setNumber(newNumber);
    } else if(Calculate.isClear(clicked)) {
      setNumber('0');
      setPath('');
      Calculate.numberArray = [];
      Calculate.operatorStack = [];
      isNumberClicked.current = false;
      isOperClicked.current = false;
    } else if(Calculate.isEqual(clicked)) {
      if(!isNumberClicked.current) return;
      Calculate.numberArray.push(number);
      Calculate.calculateTillNow();
      setPath(path + number + clicked);
      setNumber(Calculate.numberArray[Calculate.numberArray.length-1]);
    }
  }, [number, path]);

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