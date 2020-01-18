import { PLUS, MINUS, MULTIPLICATION, DIVISION } from '../constants';

const operators = [PLUS, MINUS, MULTIPLICATION, DIVISION];
let numberArray = [];
let operatorStack = [];

const isLowerPrecedence = (oper) => {
  if(operatorStack.length === 0) return false;
  const last = operatorStack[operatorStack.length-1];
  if(oper === MULTIPLICATION && (last === MINUS || last === PLUS)) return false;
  if(oper === DIVISION && (last === MINUS || last === PLUS)) return false;
  return true;
};

const calculateTillNow = () => {
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
      default: throw new Error('Invalid Operator!');
    }
    numberArray.push(result);
  }
};

const isOperator = (input) => operators.includes(input);
const isNumber = (input) => Number.isInteger(input*1);

const calculate = (state, input) => {
  const { path, number, oper } = state;
  if(input === 'C') {
    numberArray = [];
    operatorStack = [];
    return {
      path: '',
      number: '0',
      oper: null,
    };
  }
  if(input === '←') {
    if(oper) return state;
    if(number) {
      if(number.length === 1) {
        return {
          ...state,
          number: '0',
        };
      }
      return {
        ...state,
        number: number.substring(0, number.length-1),
      };
    }
    return state;
  }
  if(input === '=') {
    if(number) {
      numberArray.push(number);
      calculateTillNow();
      const newNumber = numberArray[0] + '';
      numberArray = [];
      return {
        path: path + number + input,
        number: newNumber,
        oper: null,
      };
    }
    return state;
  }
  if(isNumber(input)) {
    if(path[path.length-1] === '=') {
      return {
        ...state,
        path: '',
        number: input,
      }
    }
    if(oper) {
      if(oper === DIVISION && input === '0') {
        alert('Cannot divide by 0');
        return {
          path: '',
          number: '0',
          oper: null,
        };
      }
      return {
        ...state,
        number: input,
        oper: null,
      };
    }
    if(number) {
      const newNumber = (number === '0' ? input : number + input);
      return {
        ...state,
        number: newNumber,
      };
    }
    return state;
  }
  if(isOperator(input)) {
    if(number) {
      numberArray.push(number);
      if(isLowerPrecedence(input)) {
        calculateTillNow();
      }
      operatorStack.push(input);
      const newPath = (path[path.length-1] === '=' ? number + input : path + number + input);
      return {
        ...state,
        path: newPath,
        oper: input,
      };
    }
    return state;
  }
};

export default calculate;