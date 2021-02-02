Array.prototype.first = function () {
  return this[0];
};
Array.prototype.last = function () {
  return this[this.length - 1];
};
Array.prototype.random = function () {
  let rnd = Math.floor(Math.random() * this.length);
  return this[rnd];
};
function createClass(obj) {
  return function (...params) {
    this.constructor = obj.constructor.bind(this);
    this.constructor(...params);
    delete obj.constructor;
    Object.assign(this, obj);
  };
}
function extend(first, second) {
  Object.setPrototypeOf(first, second);
}
function onButton() {
  const Cat = createClass({
    constructor(name) {
      this.name = name;
    },
    meow() {
      console.log(`Meow, I'm ${this.name}`);
    },
  });
  const barsik = new Cat("Barsik");
  barsik.meow();
}
