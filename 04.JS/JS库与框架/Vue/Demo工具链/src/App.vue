<template>
  <div class="app">
    <Child1 ref="abc" :backgroundColor="'grey'"  :p-child1="child1" :p-child2="child2" :p-child-attrs="1231" style="font-size: 12px;" class="head" @test1="handleFocus" @test2="handleFocus"></Child1>
    <input type="text" v-model="s" />
    <div @focus="handleFocus">
      <input type="text" :value="t" @input="handelInputChange" />
    </div>
    <ul>
      <li v-for="(todo, todoIdx) in todoArr" :key="todoIdx">{{ todo.text }}</li>
      <li>123</li>
      <li class="a1"><todo-item :label="'12313'" /></li>
    </ul>
  </div>
</template>

<script>
import Child1 from './child1.vue';

export default {
  components: {
    Child1,
  },
  data() {
    return {
        child1: "pChild1的值",
          child2: "pChild2的值",
      s: 'abc',
      t: 'ghf',
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
    // console.log(this);
  },
  methods: {
    handelInputChange(e) {
      this.t = e.target.value;
    },
    handleFocus(e) {
      console.log(e);
    }
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