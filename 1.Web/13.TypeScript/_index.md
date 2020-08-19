> https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Interfaces.html

### 1.类型推论(Type by Inference)
- TypeScript会在许多情况下依照类型推论的规则推断出类型
- 这样就无需添加额外标识明确类型
- `let hello = 'nihao';` // 会推断为字符串

### 2.定义类型(Defining Types)
- 某些设计模式使自动推断类型变得困难(例如使用动态编程的模式)
- 因此,TS支持JS语言扩展,以告知具体的类型
- JS中可直接使用的(boolean,bigint,null,number,string,symbol,object,undefined)
- TS新增的(any,unknow,never,void)
- `let isDone: boolean = false;`
- `let count: number = 6;`
- `let big: bigint = 100n;`
- `let color: string = 'red';`
- `let list: number[] = [1, 2, 3];`
- `let list: Array<number> = [1, 2, 3];`
- 原组 `let x: [string, number] = ['a', 1];`
- 枚举 `enum Color { Red, Blue, Green }; let c: Color = Color.Blue;`
- unknow `let x: unknow = 4; x = '123';`
- any `declare function getName() :any; let x: string = getName();`
- void `function go(): void {}`
- undefined `let x: undefined = undefined;`
- null `let n: null = null;`
- 类型断言 `(x as string).length; (<string>x).length`
```js
type User = { name: string; }
// interface User { name: string; };
class UserAccount {
  name: string;
  constructor(opt: User) {
    this.name = opt.name;
  }
  getName(id: number): User {
    return {name: ''};
  }
}
const user1 = new UserAccount({name: 'wang'});
user1.getName(1);
```
- 可通过组合简单类型来创建复杂类型

#### 2-0.交叉类型(且)
```js
class Student {
  sId: number
  sName: string
  constructor (id: number, name: string) {
    this.sId = id;
    this.sName = name;
  }
}
class Room {
  rId: number
  rName: string
  constructor (id: number, name: string) {
    this.rId = id;
    this.rName = name;
  }
}
function getInfo(student: Student, room: Room): Student & Room {
  const res: Partial<Student & Room> = {};
  for (const k of Object.keys(student)) {
    res[k] = student[k];
  }
  for (const k of Object.keys(room)) {
    res[k] = room[k];
  }
  return <Student & Room>res;
}
const user = getInfo(new Student(1, '小明'), new Room(2, '二年级'));
console.log(user.rName);
```

#### 2-1.联合类型(Unions)(或)
- 可以声明一个类型是多选一
- 区分具体是哪种类型,只能使用 `typeof`
```js
type LockState = 'locked' | 'unlocked';
function getLength(obj: string | string[] | true) {
  return typeof obj === 'boolean' ? 0 : obj.length;
}
```

#### 2-2.泛型(Generics)(变量)
- 泛型为类型声明提供了变量支持
```js
// 1.使用 any类型使函数可以接收任何类型的参数,但丢失了一些信息：
// 传入的类型和返回的类型应该是相同的
function getName<T>(name: T): T { return name; }
getName<string>('abc');
getName(123);
// 2.指定参数的类型
function getLength<T>(list: Array<T>): T[] {
  console.log(list.length);
  return list;
}
// 3.泛型接口
interface GenericF1 {
  <T>(list: Array<T>): T[];
}
function F1<T>(list: Array<T>): T[] {
  return list;
}
let f1: GenericF1 = F1;
// 4.泛型类
class C1<T> {
  x: T;
  add: (x: T, y: T) => T;
}
let c1 = new C1<number>();
// 5.约束使用参数的类型
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
let obj = {a: 1, b: 2};
getProperty(obj, 'a');
// 6.泛型中使用类类型
class Animal {}
class Dog extends Animal {}
interface A extends Animal {};
function createInstance(c: new() => A): A {
  return new c();
}
function createInstance1<A extends Animal>(c: new() => A): A {
  return new c();
}
createInstance(Dog);
// 4.
type Point<type> = {
  x: type;
  y: type;
}
function printPoint(p: Point<number>) {
  console.log(`${p.x}, ${p.y}`);
}
```
#### 索引类型
```js
// keyof 索引类型查询操作符
interface Person { name: string; age: number; }
let p1: keyof Person; // 'name' | 'age'
p1 = 'name';
// 应用
function getVal<T, K extends keyof T>(obj: T, propNames: K[]): T[K][] {
  return propNames.map(prop => obj[prop]);
}
getVal({a: '13'}, ['a']);
```

### 3.接口(interface)
- 可选属性 `?`
- 只读属性 `readonly` (作为变量使用const,作为属性使用readonly)
```js
// 可选属性 / 只读属性
interface Size {
  readonly pi?: number;
  width?: number;
  height?: number;
}
// 函数类型
interface GetArea {
  (x: number, y: number): number;
}
// 可索引类型
interface StringArray {
  readonly [index: number]: string;
}
const arr1: StringArray = ['a', 'b'];
// 类类型
interface Animal {
  name: string;
  getName(): string;
}
class Dog implements Animal {
  name: 'Dog'
  getName() {
    return this.name;
  }
}
// 继承接口
interface Runer {
  speed: number;
}
interface Cat extends Animal, Runer {
  miao(): string;
}
// let cat1 = <Cat>{};
// 接口继承类
class Color {
  name: string;
}
interface Red extends Color {
  getRed(): string;
}
class Red1 implements Red {
  name: 'red1'
  getRed() {
    return this.name;
  }
}
```

### 4.函数
- 重载
```js
function pick(x: object): 1;
function pick(x: number): {};
function pick(x: any): true;
function pick(x): any {
  if (typeof x === 'object') {
    return 1;
  } else if (typeof x === 'number') {
    return {};
  }
  return true;
}
```

### 5.实用工具类型

#### 5-1.`Partial<T>` 表示输入类型的所有子类型
```js
interface Todo {
  title: string;
  description: string;
}
function updateTodo(todo: Todo, update: Partial<Todo>) {
  return {...todo, ...update}
}
const todo1 = {title: 'work', description: 'gogo'};
updateTodo(todo1, {description:'abc'});
```

#### 5-2.Readonly<T> 表示构造出的类型的属性不能被再次赋值
```js
interface Todo { title: string }
const todo1: Readonly<Todo> = { title: '' };
todo1.title = '123'; // error
```

#### 5-3.Record<K,T> 构造一个类型,其属性名为类型K,属性值类型T
```js
interface RegionInfo { name: string; reg: RegExp; }
type Region = 'AF' | 'CN' | 'TW';
const list: Record<Region, RegionInfo> = {
  AF: {name: '阿富汗', reg: /^\d{5,10}$/ },
  CN: {name: '阿富汗', reg: /^\d{5,10}$/ },
  TW: {name: '阿富汗', reg: /^\d{5,10}$/ },
};
```

#### 5-4.Pick<T,K> 从类型T中挑选部分属性K来构造类型
```js
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Pick<Todo, 'title' | 'completed'>;
const todo1: TodoPreview = {
  title: 'study',
  completed: true,
};
```

#### 5-5.Exclude<T,U> 从类型T中剔除所有可以赋值给U的属性
```js
type T0 = Exclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'
type T1 = Exclude<string | number | (() => void), Function>; // string | number
```

#### 5-6.Extract<T,U> 从类型T中提取所有可以赋值给U的类型
```js
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>; // 'a'
type T1 = Extract<string | number | (() => void), Function>; // ()=>void
```

### 6.模块(外部模块)
- 模块是自声明的;两个模块之间的关系是通过在文件级别上使用imports和exports建立
- 命名空间在使用模块时没有价值,模块具有自己的作用域,只有导出声明才会在模块外可见
- 命名空间对解决全局作用域里命名冲突来说很重要,比如 App.Customer.Add,App.Order.Add -- 两个类型的名字相同
- 然而,对于模块来说却不是一个问题,没有理由2个模块重名
```ts
// node.d.ts
declare module 'student' {
  interface Student {
    id: number;
    name: string;
    sex?: number;
  }
  export function getInfo(id: number): Student;
}
declare module 'teacher' {
  interface Teacher {
    id: number;
    name: string;
  }
  export function getInfo(id: number): Teacher;
}
declare module '*!text' {
  const content: string;
  export default content;
}
// 1.ts
/// <reference path='node.d.ts' />
import * as Student from 'student';
import * as Teacher from 'teacher';
import * as Text from './1.txt!text';

Student.getInfo(1);
Teacher.getInfo(2);
console.log(Text);
```

### 7.命名空间(内部模块)
```js
// Animal.ts
namespace Animal {
  export interface Animal {
    name: string;
    getName(): string;
  }
}
// Dog.ts
/// <reference path='Animal.ts' />
namespace Animal {
  export class Dog implements Animal {
    name = 'Dog';
    getName() {
      return this.name;
    }
  }
}
// 1.ts
/// <reference path='Animal.ts' />
/// <reference path='Dog.ts' />
new Animal.Dog();
```

### 8.模块解析
- 相对导入 是以 `/, ./, ../` 开头的
  - 自己写的模块应该使用相对导入
- 非相对导入 是 `import * as $ from 'jQuery';`
  - 非相对模块导入可以相对于 `baseUrl` 进行解析
- 共有2种可用的解析策略: Node和Classic, 可以使用 --moduleResolution 指定哪一种
- 若未指定
  - 使用 `--module AMD | System | ES2015` 默认 Classic
  - 其它情况则为 Node

#### 8-1. Classic解析策略
```js
// /root/src/folder/A.ts
import { b } from './B';
// 1. /root/src/folder/B.ts
// 2. /root/src/folder/B.d.ts

import { b } from 'B';
// 1. /root/src/folder/B.ts
// 2. /root/src/folder/B.d.ts
// 3. /root/src/B.ts
// 4. /root/src/B.d.ts
// 5. /root/B.ts
// 6. /root/B.d.ts
// 7. /B.ts
// 8. /B.d.ts
```

#### 8-2. Node.js模块原始策略
```js
// /root/src/moduleA.js
var x = require("./B");
// 1. /root/src/B.js
// 2. /root/src/B/package.json {"main":"B.js"}
// 3. /root/src/B/index.js

var x = require('B');
// 1. /root/src/node_modules/B.js
// 2. /root/src/node_modules/B/package.json {"main":"B.js"}
// 3. /root/src/node_modules/B/inde.js

// 4. /root/node_modules/B.js
// 5. /root/node_modules/B/package.json {"main":"B.js"}
// 6. /root/node_modules/B/inde.js

// 7. /node_modules/B.js
// 8. /node_modules/B/package.json {"main":"B.js"}
// 9. /node_modules/B/inde.js
```

#### 8-3. TS的Node解析策略
- 在 Node解析基础上,增加了扩展名(.ts, .tsx, .d.ts)
- 在package.json中使用字段 types 表示类似 main 的意义
```js
// /root/src/moduleA.js
var x = require("./B");
// 1. /root/src/B.ts、B.tsx、B.d.ts
// 2. /root/src/B/package.json {"types":"B.js"}
// 3. /root/src/B/index.ts、index.tsx、index.d.ts

var x = require('B');
// 1. /root/src/node_modules/B.ts、B.tsx、B.d.ts
// 2. /root/src/node_modules/B/package.json {"types":"B.js"}
// 3. /root/src/node_modules/B/@types/B.d.ts
// 4. /root/src/node_modules/B/index.ts、index.tsx、index.d.ts

// 5. /root/node_modules/B.ts、B.tsx、B.d.ts
// 6. /root/node_modules/B/package.json {"types":"B.js"}
// 7. /root/node_modules/B/@types/B.d.ts
// 8. /root/node_modules/B/index.ts、index.tsx、index.d.ts

// 9. /node_modules/B.ts、B.tsx、B.d.ts
// 10. /node_modules/B/package.json {"types":"B.js"}
// 11. /node_modules/B/@types/B.d.ts
// 12. /node_modules/B/index.ts、index.tsx、index.d.ts
```