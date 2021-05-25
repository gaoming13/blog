"use strict";
exports.__esModule = true;
exports.T5 = exports.C1 = exports.f1 = void 0;
// 导出变量
var s1 = 'abc';
// 导出函数
var f1 = function (x) { return 'abc'; };
exports.f1 = f1;
// 导出类
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
exports.C1 = C1;
// 导出类型.枚举
var T5;
(function (T5) {
    T5[T5["Red"] = 0] = "Red";
    T5[T5["Blue"] = 1] = "Blue";
})(T5 = exports.T5 || (exports.T5 = {}));
