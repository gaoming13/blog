setTimeout(() => {
  console.log(1);
}, 0);
setTimeout(() => {
  console.log(2);
}, 0);
const now = Date.now();
console.log(3);
while (now + 3000 > Date.now()) { }
console.log(4);