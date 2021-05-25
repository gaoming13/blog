import * as lib1 from './lib1';
// 导出之前模块的部分内容
export { C1 as P1 } from './lib1';
// 导出之前模块的全部内容
// export * from './lib1';
// 新增加的内容
export class P2 {};

// 默认导出
export default {
  lib1,
  P2,
}