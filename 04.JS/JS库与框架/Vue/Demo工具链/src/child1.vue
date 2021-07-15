<template>
  <div class="child1">
    <button @click="handleBtnClick">点我</button>
    <code>{{ $listeners }}</code>
    <code>{{ $attrs }}</code>
    <Child2 v-bind="$attrs" v-bind:red-girl="'123'" />
  </div>
</template>

<script>
import Child2 from './child2.vue';

export default {
  inheritAttrs: true,
  props: [
    'backgroundColor'
  ],
  components: {
    Child2,
  },
  methods: {
    handleBtnClick() {
      console.log(this.$children[0].$emit('hahaha', '小狗'));
      // this.$emit('hahaha', '小狗');
      // console.log(this.$listeners);
    }
  },
}
</script>

<style>
</style>