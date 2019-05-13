// @flow
/* eslint-disable */

import Compute from './compute';

class Calculator {
  constructor(calc, display) {
    this.calculator = document.querySelector(calc);
    this.display = this.calculator.querySelector(display);
    this.displayValue = '0';
    this.keys = Object.freeze({
      functions: {
        escape: 'allClear',
        // plusMinus
        '%': 'percent'
      },
      operator: {
        '+': 'add',
        '-': 'subtract',
        '*': 'multiply',
        '/': 'divide',
        '=': 'equals',
        enter: 'equals'
      },
      numbers: {
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '.': '.'
      }
    });

    this.compute = new Compute(3);

    this.update = new CustomEvent('update', { bubbles: true });

    this.handleClicks = this.handleClicks.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);

    this.init();
  }

  init() {
    this.calculator.addEventListener('click', this.handleClicks);
    document.addEventListener('keyup', this.handleKeyup);

    // Requires arrow function because of `this` context.
    this.calculator.addEventListener('update', event => {
      event.target.textContent = this.displayValue;
    });
  }

  updateDisplayValue(value) {
    if (
      (this.displayValue === '0' && value !== '0') ||
      (isNaN(parseFloat(this.lastInput)) && this.lastInput !== '.')
    ) {
      this.displayValue = value;
    } else {
      this.displayValue += value;
    }
  }

  handleClicks(event) {
    const target = event.target;

    if (!target || !target.classList.contains('button')) {
      return false;
    }

    target.classList.add('button--active');
    setTimeout(() => {
      target.classList.remove('button--active');
    }, 200);

    if (target.classList.contains('button--number')) {
      this.updateDisplayValue(target.getAttribute('id'));
    }

    if (target.classList.contains('button--function')) {
      const fnName = target.getAttribute('id');

      if (fnName === 'allClear') {
        this.displayValue = this.compute.allClear();
      } else {
        this.displayValue = this.compute[fnName](parseFloat(this.displayValue));
      }
    }

    if (target.classList.contains('button--operator')) {
      const operator = target.getAttribute('id');

      this.displayValue = this.compute.update(
        parseFloat(this.displayValue),
        operator
      );
    }

    this.lastInput = target.getAttribute('id');
    this.display.dispatchEvent(this.update);
    return true;
  }

  handleKeyup(event) {
    const key = event.key.toLowerCase();

    if (
      this.keys.functions[key] === undefined &&
      this.keys.numbers[key] === undefined &&
      this.keys.operator[key] === undefined
    ) {
      return false;
    }

    let button;

    if (this.keys.functions[key] !== undefined) {
      const fnName = this.keys.functions[key];

      button = document.getElementById(fnName);

      if (fnName === 'allClear') {
        this.displayValue = this.compute.allClear();
      } else {
        this.displayValue = this.compute[fnName](parseFloat(this.displayValue));
      }
    }

    if (this.keys.numbers[key] !== undefined) {
      button = document.getElementById(key);
      this.updateDisplayValue(key);
    }

    if (this.keys.operator[key] !== undefined) {
      const operator = this.keys.operator[key];

      button = document.getElementById(operator);
      this.displayValue = this.compute.update(
        parseFloat(this.displayValue),
        operator
      );
    }

    if (button !== null) {
      button.classList.add('button--active');
      setTimeout(() => {
        button.classList.remove('button--active');
      }, 200);
    }

    this.lastInput = key;
    this.display.dispatchEvent(this.update);
    return true;
  }
}

export default Calculator;
