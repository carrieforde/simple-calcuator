import Calculator from './calculator';

document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.calculator')) {
    window.calculator = new Calculator('.calculator', '.calculator__display');
  }
});
