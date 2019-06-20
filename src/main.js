//
// entry-point for vue-cli-service build/serve
//
import { restructureLayouts } from './utils/utils';
import Vue from 'vue';
import axios from 'axios';
import Composer from './views/composer.vue';
import Preview from './components/content/preview/preview'
import Demo from './components/demo'

// sample layouts with es6 module:
import layouts from '../public/layouts/src/all';
import '../public/layouts/src/all.css';

// sample layouts with commonjs bundle
// need to build with `npm run build-layouts` or else
// import layouts from '../public/layouts/all.json';
// import '../public/layouts/all.css';

Vue.config.productionTip = false;

const el = document.querySelector('#app');

// sample layouts with commonjs bundle:
// FIXME: resolve icons automatically...
// layouts.forEach(layout => {
//   layout.icon = require(`../public/layouts/${layout.id}/icon.svg`);
// });

const routes = {
  '/': Composer,
  '/preview': Preview,
  '/demo': Demo
}

const lastWord = str => {
  const arr = str.split('/');
  return arr[arr.length - 1] ? arr[arr.length - 1] : arr[arr.length - 2];
};

const app = new Vue({
  el,
  data: {
    currentRoute: window.location.href,
  },
  computed: {
    ViewComponent() {
      const target = lastWord(this.currentRoute);
      const result = Object.keys(routes)
        .map(e => e.substring(1))
        .includes(target)
        ? '/' + target
        : '/';
      return routes[result];
    },
  },
  render(createElement) {
    return createElement(this.ViewComponent, {
      ref: 'composer',
      on: {
        save(html, json) {
          console.log('**save: html=', html, 'json=', json);
          alert('check console log');
        },
      },
    });
  },
  mounted() {
    this.$refs.composer.setLayouts(layouts);
  },
});
/**
 * vue 라이프사이클에서 layout과 data를 구성하기보단 밖에서 별도로 분리하여 설정
 */
// axios.get('/sample.json').then((resources) => {
//   app.$refs.composer.setLayerBlockData(resources.data);
// });

// console.log(layouts); // 실제 layout 도구들...
// console.log(res.data); // layouts들을 이용하여 data와 결합하여 preview에 보여준다
