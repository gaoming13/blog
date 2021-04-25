const f1 = (param, callback) => {
  setTimeout(() => callback(null, param), 2000);
};
// thunk函数
const chunk1 = function (...params) {
  return function (callback) {
    return f1(...params, callback);
  }
};
function* gen1() {
  let res = yield chunk1('123');
  console.log(res);

  res = yield chunk1('456');
  console.log(res);

  res = yield chunk1('789');
  console.log(res);
}
const run = generator => {
  const g1 = generator();
  const next = (err, res) => {
    // 修改了上次yield的返回值
    const result = g1.next(res);
    if (result.done) return result.value;
    result.value(next);
  };
  next();
};
run(gen1);