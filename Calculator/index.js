function Calculator(startValue) {
  if (new.target) {
    this.innerValue = startValue;
    this.calculateQueue = [];
    function AddToCalculateQueue(func, arg, priotiry) {
      this.calculateQueue.push({ func, arg, priotiry });
    }
    this.plus = (someValue) => {
      AddToCalculateQueue.apply(this, [
        (value) => (this.innerValue += value),
        someValue,
        1,
      ]);
      return this;
    };
    this.multiply = (someValue) => {
      AddToCalculateQueue.apply(this, [
        (value) => (this.innerValue *= value),
        someValue,
        2,
      ]);
      return this;
    };
    this.minus = (someValue) => {
      AddToCalculateQueue.apply(this, [
        (value) => (this.innerValue -= value),
        someValue,
        1,
      ]);
      return this;
    };
    this.divide = (someValue) => {
      AddToCalculateQueue.apply(this, [
        (value) => (this.innerValue /= value),
        someValue,
        2,
      ]);
      return this;
    };
    this.calculate = () => {
      function compare(a, b) {
        if (a.priotiry < b.priotiry) {
          return -1;
        }
        if (a.priotiry > b.priotiry) {
          return 1;
        }
        return 0;
      }
      this.calculateQueue.sort(compare);
      for (let i = 0; i < this.calculateQueue.length; i++) {
        this.calculateQueue[i].func(this.calculateQueue[i].arg);
      }
      return this.innerValue;
    };
  } else {
    throw new Error('Calculator executing without "new"');
  }
}
function calcButton() {
  let a = new Calculator(2).plus(2).multiply(2).minus(1).calculate();
  alert(a);
}
