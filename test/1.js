class A {
  i = 1;
  count = 10;

  *[Symbol.iterator]() {
    for (let j = 0; j < 10; j++) {
      yield new Promise((resovle) => {
        setTimeout(() => {
          resovle(true);
        }, 1000);
      });
    }
  }

  fly () {
    console.log('fly');
  }
}
let a = new A();

async function* asyncGenerator() {
  var i = 0;
  while (i < 3) {
    yield i++;
  }
}

(async () => {
  for (num of a) {
    console.log(await num);
  }
})();

console.log('1213');