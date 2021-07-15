<template>
  <div class="app">
    <button @click="handleClick">点我</button>
    <code ref="domCode">{{ s }}</code>
  </div>
</template>

<script>

export default {
  data() {
    return {
      s: 123,
    }
  },
  methods: {
    handleClick() {
      this.s = parseInt(Math.random() * 100);
      let now = Date.now();
      this.$nextTick().then(() => {
        console.log(Date.now() - now);
        console.log(this.s + ' => ' + this.$refs['domCode'].innerText);
      });
    },
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