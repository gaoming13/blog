<template>
  <div>
    <ul>
      <li v-for="(todo, todoIdx) in todoArr" :key="todoIdx">{{ todo.text }}</li>
      <li>1111</li>
      <li class="a1"><todo-item :label="'12313'" /></li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        s: 'abc',
        todoArr: [
          { text: '学习语文' },
          { text: '学习数学' },
          { text: '学习代理' },
        ],
      }
    },
    mounted() {
      // this.todoArr.push({ text: '许西搜索' });
      // console.log(this.todoArr);

      let data1 = {
        _color: '',
      };
      Object.defineProperties(data1, {
        color: {
          get() {
            return this._color;
          },
          set(x) {
            _color = x;
            console.log(_color);
          }
        }
      });
      // console.log(data1.color);


      function deepProxy(obj, callback) {
        if (typeof obj === 'object') {
          for (let key in obj) {
            if (typeof obj[key] === 'object') {
              obj[key] = deepProxy(obj[key], callback);
            }
          }
        }
        return new Proxy(obj, {
          get: function(target, p, receiver) {
            if (p === 'color') return target._color;
            return Reflect.get(...arguments);
          },
          set: function(target, p, value, receiver) {
            if (p === 'color') {
              target._color = value;
              return true;
            } else {
              return Reflect.set(...arguments);
            }
          },
        });
      }
      const data2 = deepProxy({
        _color: '',
        boy: {
          // age: 13
        },
      }, () => {
        console.log('12313');
      });

      data2.boy.age = '嘻嘻嘻';
      console.log(data2.boy.age);
    },
  }
</script>

<style>
@media (min-width: 640px) {
  .a1 {
    color: red;
  }
}
@media (min-width: 960px) {
  .a1 {
    color: blue;
  }
}
</style>