class Vue {
  constructor(opt) {
    // 参数初始化
    this.template = typeof opt.template === 'string' ? opt.template : '';
    this.data = opt.data || {};
    this.created = opt.created || (() => {});
    this.mounted = opt.mounted || (() => {});
    this.dom = null;
    // 数据绑定监听
    let properties = {};
    for (const k of Object.keys(this.data)) {
      properties[k] = {
        get: () => {
          return this.data[k];
        },
        set: (val) => {
          this.data[k] = val;
          this.render();
        },
      };
    }
    console.log(properties);
    Object.defineProperties(this, properties);
  }

  // 加载到dom
  $mount(dom) {
    this.dom = dom;
    this.created();
    // mounted
    this.render();
    this.mounted();
  }

  render() {
    this.dom.innerHTML = template.render(this.template, this.data);
    const vModelDoms = this.dom.querySelectorAll('input[v-model]');
    for (let i = 0; i < vModelDoms.length; i++) {
      const vModelDom = vModelDoms[i];
      const dataK = vModelDom.getAttribute('v-model');
      // 设置value值
      // vModelDom.setAttribute('value', val);
      // 给数据绑定牵连事件
      if (! this[dataK].__proto__['_vue_invole']) {
        this[dataK].__proto__['_vue_invole'] = [];
      }
      this[dataK].__proto__['_vue_invole'].push((val) => {
        vModelDom.setAttribute('value', val);
      });
    }
  }
}