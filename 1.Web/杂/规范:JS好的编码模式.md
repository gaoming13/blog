- [参考](https://www.johnstewart.dev/five-programming-patterns-i-like/)

### 保镖模式

```js
function fillParam(raw) {
  if (! Array.isArray(raw)) {
    return [];
  }
  if (raw.length == 1) {
    return [];
  }
  return raw.map((v) => v);
}
```

- 鼓励开发者考虑 无效/边缘 情况，并做拦截处理
- 避免无效用例做不必要的代码运算

### switch转对象字面量

```js
function getVoice(animal) {
  let voiceMaker = null;
  switch (animal) {
    case 'dog':
      voiceMaker = () => 'wang wang...';
    case 'cat':
      voiceMaker = () => 'miao miao...';
    default:
      voiceMaker = () => 'can not recognize.';
  }
  return voiceMaker();
}

function getVoice(animal) {
  const enumVoiceMaker = {
    dog: () => 'wang wang...',
    cat: () => 'miao miao...',
    default: () => 'can not recognize.',
  };
  return (enumVoiceMaker[animal] || enumVoiceMaker['default'])();
}
```