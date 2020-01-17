export const PLUS = '+';
export const MINUS = '-';
export const MULTIPLICATION = String.fromCharCode('0x00D7');
export const DIVISION = String.fromCharCode('0x00F7');
export const EQUAL = '=';
export const ERASE = '←';
export const CLEAR = 'C';

export const contents = [
  ['1','2','3',PLUS],
  ['4','5','6',MINUS],
  ['7','8','9',MULTIPLICATION],
  ['','0','',DIVISION],
  [CLEAR,'',ERASE,EQUAL]
];
export const operators = [PLUS, MINUS, MULTIPLICATION, DIVISION];