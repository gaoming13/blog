function getSum() {
  console.log(arguments);
}
let arr = [1, 2, 3, 4];
getSum(...arr);
getSum.apply(this, arr);