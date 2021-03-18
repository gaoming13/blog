interface O1 {
  toSting(): string;
}
interface O1Constructor {
  assign(target: O1, source1: O1): any;
}

declare var O1: O1Constructor;

const obj2 = {
  a: 1,
  b: 2,
};
O1.assign({}, obj2);