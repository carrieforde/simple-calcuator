import Compute from '../compute';

const compute = new Compute();

test('That values are successfully converted to plus / minus.', () => {
  expect(compute.plusMinus(909)).toBe(-909);
});

test('That values are successfully converted to plus / minus.', () => {
  expect(compute.plusMinus(-909)).toBe(909);
});

test('That values are successfully converted to percent', () => {
  expect(compute.percent(100)).toBe(1);
});

test('That values are successfully added.', () => {
  expect(compute.add(1, 1)).toBe(2);
});

test('That values are successfully subtracted.', () => {
  expect(compute.subtract(99, 33)).toBe(66);
});

test('That values are successfully multiplied.', () => {
  expect(compute.multiply(6, 7)).toBe(42);
});

test('That values are successfully divided.', () => {
  expect(compute.divide(100, 4)).toBe(25);
});
