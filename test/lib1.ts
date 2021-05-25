// 导出变量
const s1 = 'abc';
// 导出函数
export const f1 = (x: string) => 'abc';

// 导出类
export class C1 {}

// 导出类型.字符串
export type T1 = string;
// 导出类型.函数
export type T2 = (x: string) => string;
// 导出类型.元组
export type T3 = [string, number]
// 导出类型.联合
export type T4 = 'red' | 'blue'
// 导出类型.枚举
export enum T5 { Red, Blue }
// 导出类型.交叉
export type T6 = {}
export type T7 = {}
export type T8 = T6 & T7
// 导出接口
export interface T9 {}

// 对导出的部分重命名
export { T9 as T10 };

