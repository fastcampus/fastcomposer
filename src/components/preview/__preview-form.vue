<template>
  <form class="fc-block__form" @submit="$emit('apply', block)">
    <fieldset
      v-for="param in block.layout.params"
      :key="param.name"
      class="fc-block__form__fieldset"
    >
      <label class="fc-block__form__label" :for="block.id + '--' + param.type">
        <strong class="fc-block__form__name">{{ param.name }}</strong>
        ({{ param.type }})
      </label>

      <template v-if="param.type === 'image'">
        <input
          type="url"
          :id="block.id + '--' + param.type"
          :name="param.name"
          :placeholder="param.description"
          v-model="values[param.name]"
        />
        <preview-edit
          :name="param.name"
          accept="image/*"
          @upload="upload"
        ></preview-edit>
      </template>

      <template v-else>
        <input
          class="fc-block__form__input"
          :id="block.id + '--' + param.type"
          :type="param.type"
          :name="param.name"
          :placeholder="param.description"
          v-model="values[param.name]"
        />
      </template>
    </fieldset>
  </form>
</template>

<script>
import debounce from 'lodash/debounce';
import PreviewEdit from './__preview-edit.vue';

export default {
  name: 'preview-form',
  components: {
    PreviewEdit
  },
  props: {
    block: Object
  },
  data() {
    return {
      values: this.block.values // ref. for live-update
      // view: Object.assign({}, this.block.value) // clone for manual apply/reset
    };
  },
  methods: {
    resize: debounce(event => {
      event.target.style.height = 'auto';
      event.target.style.height = `${event.target.scrollHeight}px`;
    }, 100),
    upload(name, url) {
      this.values[name] = url;
    }
    // apply() {
    //   this.block.values = Object.assign({}, this.values);
    // },
    // reset() {
    //   this.values = Object.assign({}, this.block.values);
    // }
  }
};
</script>

<style lang="scss" scoped></style>
