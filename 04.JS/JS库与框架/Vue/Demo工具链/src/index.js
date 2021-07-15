import Vue from 'vue';
// import VueBus from 'vue-bus';
import App from './App.vue';

// Vue.use(VueBus);

const root = document.createElement('div');
document.body.appendChild(root);

// 定义组件
Vue.component('todo-item', {
  props: ['label'],
  render: function(h) {
    return h('span', this.label);
  },
});

new Vue({
  // 页面上已经存在的DOM元素,作为Vue实例的挂载目标
  // 可以是CSS选择器,也可以是HTMLElement实例
  // 会立即进入编译过程，否则，需显试调用 vm.$mount() 开启编译
  // el: root,

  // 模块加载机制：AMD+CommonJs+UMD+ESM
  // 完整版(vue.min.js)：编译器(compiler) + 运行时版本(runtime-only)
  // 编译器：用来将模板字符串编译成 JS 渲染函数的代码
  // 运行时(vue.runtime.min.js)：用来创建 Vue 实例、渲染并处理虚拟DOM等

  // 1.若需要客户端编译模板,比如：
  //  > 传入一个字符串给template选项 或
  //  > 挂载一个元素上并使用其DOM内部的HTML作为模板
  //  就需要加上编译器(compiler),即完整版
  // 2.正常webpack打包，使用预编译器(vue-loader)将vue模板编译成 render 函数
  //  > 浏览器运行时，就不需要编译器了
  // template: '<div><ul><li>鸭子</li></ul></div>',

  components: {App},
  render: (h) => h('App'),

  // render(h) {
  //   return h('div', [
  //     h('ul', [
  //       h('li', { style: { color: 'red' } }, '鸭子'),
  //       h('li', { style: { color: 'green' } }, '小鸡'),
  //       h('li', '天鹅'),
  //     ]),
  //   ]);
  // },
  // renderError(h, err) {
  //   return h('pre', err.stack);
  // }
}).$mount(root);