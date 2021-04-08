let application = function() {
  // 私有变量
  let compArr = [];
  // 返回对象字面量
  let obj = new Other();
  obj.getCompNum = function() {
    return compArr.length
  };
  obj.registercomp = function(comp) {
    compArr.push(comp);
  };
  return obj;
}();

