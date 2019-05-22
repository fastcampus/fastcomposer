<template>
  <div class="fc-editor">
    <header>
      <h3>editor</h3>
      <button @click="save"><i class="fas fa-save"></i></button>
    </header>
    <main>
      <Container @drop="onDrop" drag-handle-selector=".row-drag-handle">
        <Draggable v-for="block in blocks" :key="block.id">
          <block-item
            :block="block"
            :active="block === activeBlock"
            @select="selectBlock(block)"
            @remove="removeBlock(block)"
          ></block-item>
          <block-form v-if="block === activeBlock" :block="block" :key="block.id + '-form'"></block-form>
        </Draggable>
      </Container>
    </main>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import marked from 'marked';
import BlockItem from './block-item.vue';
import BlockForm from './block-form.vue';

const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = arr;
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

export default {
  name: 'editor-pane',
  components: {
    BlockItem,
    BlockForm,
    Container,
    Draggable,
  },
  props: {
    blocks: Array,
  },
  data() {
    return {
      activeBlock: null,
      zoom: 100,
    };
  },
  methods: {
    onDrop(dropResult) {
      this.blocks = applyDrag(this.blocks, dropResult);
    },
    selectBlock(block) {
      this.activeBlock = block;
      this.$emit('select', block);
    },
    addBlock(block) {
      this.blocks.push(block);
      this.selectBlock(block);
    },
    removeBlock(block) {
      const blockIndex = this.blocks.indexOf(block);
      if (blockIndex !== -1) {
        this.blocks.splice(blockIndex, 1);
        this.selectBlock(null);
      }
    },
    save() {
      const html = this.blocks
        .map(
          block => `
<section class="fc-block fc-layout fc-layout-${block.layout.id}">
${block.layout.templateFunc({ $markdown: marked, ...block.values })}
</section>`
        )
        .join('\n');
      this.$emit('save', html);
    },
  },
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
