import Vue from 'vue';
import Composer from './composer.vue';
import layouts from '../node_modules/fastcomposer-layouts-fastcampus/src/all.json';
import styles from '../node_modules/fastcomposer-layouts-fastcampus/src/all.css';

Vue.config.productionTip = false;

const el = document.querySelector('#app');
const title = el.dataset.title || el.title;
const value = el.dataset.value || el.value;

new Vue({
  el,
  render: h =>
    h(Composer, {
      props: { title, value, layouts },
      on: {
        save: (html, json) => {
          console.log('**save: html=', html, 'json=', json);
        }
      }
    })
});
