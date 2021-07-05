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
      this.todoArr.push({ text: '许西搜索' });
      console.log(this.todoArr);
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