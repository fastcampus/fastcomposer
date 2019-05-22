<template>
  <div class="fc-preview">
    <main id="#main" class="fc-preview__main" role="main" :style="{ zoom }">
      <div
        v-for="(block, blockIndex) in blocks"
        :key="'block-' + blockIndex"
        :active="activeBlock === block"
        class="fc-block"
      >
        <input :id="block.id" class="fc-preview__checkbox a11y" type="checkbox" />

        <label class="fc-preview__label" :for="block.id">
          <block-preview
            :block="block"
            @select="selectBlock(block)"
          ></block-preview>
        </label>

        <div class="fc-block__edit">
          <block-form :block="block" :key="block.id + '-form'"></block-form>

          <block-button
            :block="block"
            :key="block.id + '-button'"
            @toggle="toggleBlock(block)"
            @remove="removeBlock(block)"
            @up="upBlock(block)"
            @down="downBlock(block)"
          ></block-button>
        </div>
      </div>
    </main>

    <button class="fc-preview__save" type="button" @click="save">
      <i class="material-icons">&#xE5CA;</i>
    </button>
  </div>
</template>

<script>
import marked from 'marked';

import BlockButton from './__preview-button.vue';
import BlockPreview from './__preview-block.vue';
import BlockForm from './__preview-form.vue';

export default {
  name: 'preview-pane',
  components: {
    BlockPreview,
    BlockForm,
    BlockButton
  },
  props: {
    blocks: Array
  },
  data() {
    return {
      activeBlock: null,
      zoom: 1
    };
  },
  methods: {
    selectBlock(block) {
      this.activeBlock = block;
    },
    addBlock(block) {
      this.blocks.push(block);
      this.selectBlock(block);
    },
    toggleBlock(block) {
      this.$set(block, 'hidden', !block.hidden);
    },
    removeBlock(block) {
      const blockIndex = this.blocks.indexOf(block);
      if (blockIndex !== -1) {
        this.blocks.splice(blockIndex, 1);
        // this.selectBlock(null);
      }
    },
    upBlock(block) {
      const blockIndex = this.blocks.indexOf(block);
      if (blockIndex > 0) {
        const tempBlock = this.blocks[blockIndex];
        this.$set(this.blocks, blockIndex, this.blocks[blockIndex - 1]);
        this.$set(this.blocks, blockIndex - 1, tempBlock);
      }
    },
    downBlock(block) {
      const blockIndex = this.blocks.indexOf(block);
      if (blockIndex !== -1 && blockIndex < this.blocks.length - 1) {
        const tempBlock = this.blocks[blockIndex];
        this.$set(this.blocks, blockIndex, this.blocks[blockIndex + 1]);
        this.$set(this.blocks, blockIndex + 1, tempBlock);
      }
    },
    save() {
      const html = this.blocks
        .map(
          block => `
            <section class="fc-block fc-layout fc-layout-${block.layout.id}">
              ${block.layout.templateFunc({
                $markdown: marked,
                ...block.values
              })}
            </section>`
        )
        .join('\n');
      this.$emit('save', html);
    }
  }
};
</script>

<style lang="scss"></style>
