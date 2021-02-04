function Calculator(startValue) {
  if (new.target) {
    this._innerExpression = String(startValue);
    this.plus = (someValue) => {
      this._innerExpression += `+${someValue}`;
      return this;
    };
    this.multiply = (someValue) => {
      this._innerExpression += `*${someValue}`;
      return this;
    };
    this.minus = (someValue) => {
      this._innerExpression += `-${someValue}`;
      return this;
    };
    this.divide = (someValue) => {
      this._innerExpression += `/${someValue}`;
      return this;
    };
    this.calculate = () => {
      "strict mode";
      let allowedChars = "1234567890.+*-/";
      for (let i = 0; i < this._innerExpression.length; i++) {
        if (!allowedChars.includes(this._innerExpression[i])) {
          throw new Error("Unknown characters in expression");
        }
      }
      let result = new Function("return " + this._innerExpression);
      return result();
    };
  } else {
    throw new Error('Calculator executing without "new"');
  }
}
function calcButton() {
  let a = new Calculator(2).plus(2).multiply(2).minus(1).calculate();
  alert(a);
}
