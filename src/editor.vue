<template>
  <div class="fc-editor">
    <header>
      <h3>editor</h3>
      <button @click="save"><i class="fas fa-save"></i></button>
    </header>
    <main>
      <template v-for="block in blocks">
        <BlockItem :block="block"
                   @select="selectBlock(block)"
                   @remove="removeBlock(block)"
                   @up="upBlock(block)"
                   @down="downBlock(block)"></BlockItem>
        <BlockForm v-if="block === activeBlock" :block="block"></BlockForm>
      </template>
    </main>
  </div>
</template>

<script>
import BlockItem from './block-item.vue';
import BlockForm from './block-form.vue';

export default {
  props: {
    blocks: Array
  },
  data: function() {
    return {
      activeBlock: null,
      zoom: 100
    };
  },
  methods: {
    selectBlock: function(block) {
      this.activeBlock = block;
    },
    addBlock: function(layout) {
      const newBlock = {
        layout: layout,
        values: layout.values || {}
      };
      this.blocks.push(newBlock);
      this.selectBlock(newBlock);
    },
    removeBlock: function(block) {
      const blockIndex = this.blocks.indexOf(block);
      if (blockIndex !== -1) {
        this.blocks.splice(blockIndex, 1);
        this.selectBlock(null);
      }
    },
    upBlock: function(block) {
      const blockIndex = this.blocks.indexOf(block);
      if (blockIndex > 0) {
        const tempBlock = this.blocks[blockIndex];
        // this.blocks[blockIndex] = this.blocks[blockIndex - 1];
        // this.blocks[blockIndex - 1] = tempBlock;
        this.$set(this.blocks, blockIndex, this.blocks[blockIndex - 1]);
        this.$set(this.blocks, blockIndex - 1, tempBlock);
      }
    },
    downBlock: function(block) {
      const blockIndex = this.blocks.indexOf(block);
      if (blockIndex !== -1 && blockIndex < this.blocks.length - 1) {
        const tempBlock = this.blocks[blockIndex];
        // this.blocks[blockIndex] = this.blocks[blockIndex + 1];
        // this.blocks[blockIndex + 1] = tempBlock;
        this.$set(this.blocks, blockIndex, this.blocks[blockIndex + 1]);
        this.$set(this.blocks, blockIndex + 1, tempBlock);
      }
    },
    save: function() {
      const html = this.blocks
        .map(
          block => `
<section class="fc-block fc-layout fc-layout-${block.layout.id}">
${block.layout.templateFunc(block.values)}
</section>`
        )
        .join('\n');
      this.$emit('save', html);
    }
  },
  components: {
    BlockItem,
    BlockForm
  }
};
</script>

<style lang="scss" scoped>
.fc-editor {
  flex: 0 0 20rem;
  width: 20rem;
  display: flex;
  flex-direction: column;

  > header {
    display: flex;
    flex: 0 0 2rem;
    height: 2rem;
    h3 {
      flex: 1 1 0;
      margin: 0;
      padding: 0;
    }
    button {
      flex: 0 0 2rem;
      width: 2rem;
      height: 2rem;
      text-align: center;
    }
  }

  > main {
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    overflow: scroll;
  }
}
</style>
