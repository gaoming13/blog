<template>
  <div class="child1">
    <code>123</code>
  </div>
</template>

<script>
let s = 123;
console.log('sdfsadfaf');
export default {
  data() {
    console.log('1111');
    return {};
  },
  mounted() {
    console.log(s);
    s = 456;
    console.log(s);
  }
}
</script>

<style>
</style>