const obj = {
  num: 0,
};
setTimeout(() => {
  obj.num = 10;
}, 1000);
module.exports = obj;

console.log(module);