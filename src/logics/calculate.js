import { PLUS, MINUS, MULTIPLICATION, DIVISION, EQUAL, CLEAR, ERASE } from '../constants';

const operators = [PLUS, MINUS, MULTIPLICATION, DIVISION];
export const numberArray = [];
export const operatorStack = [];

export const isLowerPrecedence = (oper) => {
  if(operatorStack.length === 0) return false;
  const last = operatorStack[operatorStack.length-1];
  if(oper === MULTIPLICATION && (last === MINUS || last === PLUS)) return false;
  if(oper === DIVISION && (last === MINUS || last === PLUS)) return false;
  return true;
};

export const calculateTillNow = () => {
  while(operatorStack.length) {
    const num2 = numberArray.pop()*1;
    const num1 = numberArray.pop()*1;
    const oper = operatorStack.pop();
    let result = 0;
    switch (oper) {
      case PLUS: result = num1 + num2; break;
      case MINUS: result = num1 - num2; break;
      case MULTIPLICATION: result = num1 * num2; break;
      case DIVISION: result = num1 / num2; break;
      default: throw new Error('Invalid');
    }
    numberArray.push(result);
  }
};

export const isOperator = (input) => operators.includes(input);
export const isNumber = (input) => Number.isInteger(input*1);
export const isErase = (input) => input === ERASE;
export const isClear = (input) => input === CLEAR;
export const isEqual = (input) => input === EQUAL;