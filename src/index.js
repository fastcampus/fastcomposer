import Vue from 'vue';

import BlockForm from './block-form.vue';
import BlockItem from './block-item.vue';
import BlockPreview from './block-preview.vue';
import Composer from './composer.vue';
import Preview from './preview.vue';
import Sidebar from './sidebar.vue';
import FileUpload from './file-upload.vue';

const components = { BlockForm, BlockItem, BlockPreview, Composer, Preview, Sidebar, FileUpload };

Object.keys(components).forEach(it => Vue.component(it, components[it]));

export default components;
