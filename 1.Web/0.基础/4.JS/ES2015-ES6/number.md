### number扩展
- 1.新增二进制和八进制的新写法: 0b/0B/0o/0O
- 2.新增 Number.isFinite() / Number.isNaN()
- 3.将全局方法parseInt()和parseFloat()，移植到Number对象上面
- 4.新增 Number.isInteger()
- 5.新增 Number.EPSILON
- 6.新增 Number.MAX_SAFE_INTEGER / Number.MIN_SAFE_INTEGER
- 7.新增 Math.trunc() / Math.sign() / Math.cbrt() / Math.clz32()
    Math.imul() / Math.fround() / Math.hypot()
- 8.新增对数方法 Math.expm1() / Math.log1p() / Math.log10() / Math.log2()
- 9.新增双曲函数方法
  - Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
  - Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
  - Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
  - Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
  - Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
  - Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）
- 10.新增指数运算符 (**)
- 11.新增 BigInt 数据类型