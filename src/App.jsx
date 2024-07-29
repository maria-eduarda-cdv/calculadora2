import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [operator, setOperator] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const updateDisplay = (value) => {
    if (display === '0' || waitingForOperand) {
      setDisplay(value);
      setWaitingForOperand(false);
    } else {
      setDisplay(display + value);
    }
  };

  const handleOperator = (nextOperator) => {
    if (operator !== '') {
      const result = calculate(parseFloat(currentValue), operator, parseFloat(display));
      setDisplay(result.toString());
      setCurrentValue(result.toString());
    } else {
      setCurrentValue(display);
    }
    setOperator(nextOperator);
    setWaitingForOperand(true);
  };

  const calculate = (leftOperand, operator, rightOperand) => {
    switch (operator) {
      case '+':
        return leftOperand + rightOperand;
      case '-':
        return leftOperand - rightOperand;
      case '*':
        return leftOperand * rightOperand;
      case '/':
        return leftOperand / rightOperand;
      default:
        return rightOperand;
    }
  };

  const handleEqual = () => {
    const result = calculate(parseFloat(currentValue), operator, parseFloat(display));
    setDisplay(result.toString());
    setCurrentValue(result.toString());
    setOperator('');
    setWaitingForOperand(true);
  };

  const clearCalculator = () => {
    setDisplay('0');
    setCurrentValue('');
    setOperator('');
    setWaitingForOperand(false);
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button onClick={() => updateDisplay('7')}>7</button>
        <button onClick={() => updateDisplay('8')}>8</button>
        <button onClick={() => updateDisplay('9')}>9</button>
        <button className="operator" onClick={() => handleOperator('/')}>/</button>

        <button onClick={() => updateDisplay('4')}>4</button>
        <button onClick={() => updateDisplay('5')}>5</button>
        <button onClick={() => updateDisplay('6')}>6</button>
        <button className="operator" onClick={() => handleOperator('*')}>*</button>

        <button onClick={() => updateDisplay('1')}>1</button>
        <button onClick={() => updateDisplay('2')}>2</button>
        <button onClick={() => updateDisplay('3')}>3</button>
        <button className="operator" onClick={() => handleOperator('-')}>-</button>

        <button onClick={() => updateDisplay('0')}>0</button>
        <button className="clear" onClick={clearCalculator}>C</button>
        <button className="equal" onClick={handleEqual}>=</button>
        <button className="operator" onClick={() => handleOperator('+')}>+</button>
      </div>
    </div>
  );
}

export default App;