class A {
  foo() { return 1; }
  get [Symbol.unscopables]() {
    return { foo: true };
  }
}
with (A.prototype) {
  console.log(foo());
}