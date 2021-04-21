const obj = {
  s1: 'abc',
};
const proxy = new Proxy(obj, {
  get(target, p, receiver) {
    console.log(p);
    return 'ss';
  },
  // set(target, property, value, receiver) {
  //   console.log({property, value});
  //   return true;
  // },
  has(target, p, receiver) {
    console.log(p);
    return true;
  },
});
