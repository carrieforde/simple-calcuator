// @flow
/* eslint-disable */

import Compute from './compute';

class Calculator {
  constructor(calc, display) {
    this.calculator = document.querySelector(calc);
    this.display = this.calculator.querySelector(display);
    this.displayValue = '0';

    this.compute = new Compute(3);

    this.update = new CustomEvent('update', { bubbles: true });

    this.handleClicks = this.handleClicks.bind(this);

    this.init();
  }

  init() {
    this.calculator.addEventListener('click', this.handleClicks);

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

    if (!target && !target.classList.contains('button')) {
      return false;
    }

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
}

export default Calculator;
