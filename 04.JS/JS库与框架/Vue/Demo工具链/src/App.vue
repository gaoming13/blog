<template>
  <div>
    <ul>
      <li v-for="(todo, todoIdx) in todoArr" :key="todoIdx">{{ todo.text }}</li>
      <li>b</li>
      <li><todo-item :label="'12313'" /></li>
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
      this.todoArr.push({ text: '许西搜索' });
      console.log(this.todoArr);

      const data = Object.defineProperties({
        _s: '',
      }, {
        s: {
          get() {
            return this._s;
          },
          set(val) {
            this._s = val + '=>' + Date.now();
          },
        }
      });
      data.s = 'hehe';
      console.log(data.s);
    },
  }
</script>