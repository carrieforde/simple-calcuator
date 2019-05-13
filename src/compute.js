class Compute {
  constructor(capacity) {
    this.capacity = capacity || Infinity;
    this.storage = new Map();
    this.head = 0;
    this.tail = 0;
    this.computed = 0;
  }

  enqueue(value) {
    if (this.tail >= this.capacity) {
      return 'Max capacity reached. Remove an element before adding a new one.';
    }

    this.storage.set(this.tail++, value);

    return this.tail;
  }

  dequeue() {
    const removed = this.storage.get(this.head);

    this.storage.delete(this.head++);

    return removed;
  }

  peek() {
    return this.storage.get(this.head);
  }

  update(number, operator) {
    this.enqueue(number);

    if (this.storage.size === 3) {
      const val1 = this.storage.get(this.head),
        valOp = this.storage.get(this.head + 1),
        val2 = this.storage.get(this.head + 2);

      this.computed = this[valOp](val1, val2);

      this.clearStorage();
      this.enqueue(this.computed);
      this.enqueue(operator);
      return this.computed;
    }

    this.enqueue(operator);
    return number;
  }

  clearStorage() {
    this.storage.clear();
    this.head = 0;
    this.tail = 0;
  }

  allClear() {
    this.storage.clear();
    this.head = 0;
    this.tail = 0;
    this.computed = 0;

    return this.computed;
  }

  plusMinus(value) {
    return parseFloat(value) * -1;
  }

  percent(value) {
    return parseFloat(value) / 100;
  }

  add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
  }

  subtract(num1, num2) {
    return parseFloat(num1) - parseFloat(num2);
  }

  multiply(num1, num2) {
    return parseFloat(num1) * parseFloat(num2);
  }

  divide(num1, num2) {
    return parseFloat(num1) / parseFloat(num2);
  }
}

export default Compute;
