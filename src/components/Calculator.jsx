import React, { useState, useCallback } from 'react';
import '../styles/Calculator.scss';
import { contents } from '../constants';
import calculate from '../logics/calculate';
import Tr from './Tr';

const Calculator = () => {
  const [info, setInfo] = useState({
    path: '',
    number: '0',
    oper: null,
  });

  const onClickButton = useCallback((clicked) => {
    const newState = calculate(info, clicked);
    setInfo(newState);
  }, [info]);

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th className="path" colSpan="4">
              {info.path}
            </th>
          </tr>
          <tr>
            <th colSpan="4">{parseInt(info.number).toLocaleString()}</th>
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