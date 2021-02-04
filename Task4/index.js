function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
let customAll = function (promises) {
  return new Promise(function (resolve, reject) {
    var count = promises.length;
    var result = [];
    var checkDone = function () {
      if (--count === 0) resolve(result);
    };
    promises.forEach(function (p, i) {
      p.then(function (x) {
        result[i] = x;
      }, reject).then(checkDone);
    });
  });
};
function isEqual(first, second) {
  if (
    isNaN(first) &&
    isNaN(second) &&
    typeof first === "number" &&
    typeof second === "number"
  ) {
    return true;
  }
  if (first === second) return true;

  if (!(first instanceof Object) || !(second instanceof Object)) return false;

  if (first.constructor !== second.constructor) return false;
  if (Object.getPrototypeOf(first) !== Object.getPrototypeOf(second))
    return false;

  for (let property in first) {
    if (!first.hasOwnProperty(property)) continue;

    if (!second.hasOwnProperty(property)) return false;

    if (first[property] === second[property]) continue;

    if (typeof first[property] !== "object") return false;

    if (!isEqual(first[property], second[property])) return false;
  }

  for (property in second)
    if (second.hasOwnProperty(property) && !first.hasOwnProperty(property))
      return false;
  return true;
}

let customRace = function (promises) {
  return new Promise(function (resolve, reject) {
    promises.forEach(function (promise) {
      promise.then(resolve, reject);
    });
  });
};
console.log(1);
customAll([delay(1000), delay(5000)]).then((result) => console.log("all2"));
customRace([delay(1000), delay(5000)]).then((result) => console.log("race2"));
