// @flow
/* eslint-disable */
class Calculator {
  constructor(calc, display) {
    this.calculator = document.querySelector(calc);
    this.display = this.calculator.querySelector(display);
    this.displayValue = '0';
    this.computed = 0;
    this.lastInput = '';
    this.lastOperator = '';

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
      this.displayValue === '0' ||
      (isNaN(parseFloat(this.lastInput)) && this.lastInput !== '.')
    ) {
      this.displayValue = value;
    } else {
      this.displayValue += value;
    }
  }

  clear() {
    this.displayValue = '0';
    this.computed = 0;
  }

  plusMinus() {
    this.displayValue = (parseFloat(this.displayValue) * -1).toString();
  }

  percent() {
    this.displayValue = (parseFloat(this.displayValue) / 100).toString();
  }

  add() {
    this.computed = this.computed + parseFloat(this.displayValue);
    this.displayValue = this.computed.toString();
  }

  subtract() {
    this.computed = this.computed - parseFloat(this.displayValue);
    this.displayValue = this.computed.toString();
  }

  multiply() {
    this.computed = this.computed * parseFloat(this.displayValue);
    this.displayValue = this.computed.toString();
  }

  divide() {
    this.computed = this.computed / parseFloat(this.displayValue);
    this.displayValue = this.computed.toString();
  }

  equals() {
    this.performOperation(this.lastOperator);
  }

  performOperation(operator) {
    switch (operator) {
      case 'divide':
        this.divide();
        break;

      case 'multiply':
        this.multiply();
        break;

      case 'subtract':
        this.subtract();
        break;

      case 'add':
        this.add();
        break;

      case 'equals':
        this.equals();
        break;

      default:
        console.error('An error has occurred.');
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
      switch (target.getAttribute('id')) {
        case 'clear':
          this.clear();
          break;

        case 'plus-minus':
          this.plusMinus();
          break;

        case 'percent':
          this.percent();
          break;

        default:
          console.error('An error has occurred.');
      }
    }

    if (target.classList.contains('button--operator')) {
      const operator = target.getAttribute('id');
      this.performOperation(operator);
      this.lastOperator = operator;
    }

    this.lastInput = target.getAttribute('id');
    this.display.dispatchEvent(this.update);
    return true;
  }
}

export default Calculator;
