import React, { useState } from 'react';
import '../styles/Calculator.scss';
import { contents } from '../constants';
import calculate from '../logics/calculate';
import Button from './Button';

const Calculator = () => {
  const [info, setInfo] = useState({
    path: '',
    number: '0',
    oper: null,
  });

  const onClickButton = (clicked) => {
    const newState = calculate(info, clicked);
    setInfo(newState);
  };

  return (
    <div className="container">
      <div className="calculator">
        <div className="calculator__path">
          {info.path}
        </div>
        <div className="calculator__number">
          {parseInt(info.number).toLocaleString()}
        </div>
        <div className="calculator__panel">
          {contents.map((cols) => 
            <Button key={cols.toString()} cols={cols} handler={onClickButton} />)}
        </div>
      </div>
    </div>
  );
}

export default Calculator;