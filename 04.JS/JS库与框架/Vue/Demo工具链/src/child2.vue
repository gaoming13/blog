<template>
  <div class="child2">{{ $attrs }}</div>
</template>

<script>
export default {
  name: 'child2',
  props: [
    'redGirl'
  ],
  mounted() {
    this.$on('hahaha', (...p) => {
      console.log(p);
    });
    console.log(this);
  },
}
</script>