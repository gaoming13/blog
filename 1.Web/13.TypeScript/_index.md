> https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

### 1.类型推论(Type by Inference)
- TypeScript会在许多情况下依照类型推论的规则推断出类型
- 这样就无需添加额外标识明确类型
- `let hello = 'nihao';` // 会推断为字符串

### 2.定义类型(Defining Types)
- 某些设计模式使自动推断类型变得困难(例如使用动态编程的模式)
- 因此,TS支持JS语言扩展,以告知具体的类型
- JS中可直接使用的(boolean,bigint,null,number,string,symbol,object,undefined)
- TS新增的(any,unknow,never,void)
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

#### 2-1.联合类型(Unions)
- 可以声明一个类型是多选一
- 区分具体是哪种类型,只能使用 `typeof`
```js
type LockState = 'locked' | 'unlocked';
function getLength(obj: string | string[] | true) {
  return typeof obj === 'boolean' ? 0 : obj.length;
}
```

#### 2-2.泛型(Generics)
- 泛型为类型声明提供了变量支持
- `type StringArray = Array<string>;`
- `type ObjectWidthNameArray = Array<{name: string}>;`
```js
type Point<type> = {
  x: type;
  y: type;
}
function printPoint(p: Point<number>) {
  console.log(`${p.x}, ${p.y}`);
}
```
