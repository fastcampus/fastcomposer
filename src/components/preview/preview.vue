<template>
  <div class="fc-preview">
    <main id="#main" class="fc-preview__main" role="main" :style="{ zoom }">
      <div
        v-for="(block, blockIndex) in blocks"
        :key="'block-' + blockIndex"
        :active="activeBlock === block"
        class="fc-block"
      >
        <input
          :id="block.id"
          class="fc-preview__checkbox a11y"
          type="checkbox"
        />

        <label class="fc-preview__label" :for="block.id">
          <preview-block
            :block="block"
            @select="selectBlock(block)"
          ></preview-block>
        </label>

        <div class="fc-block__edit">
          <preview-form :block="block" :key="block.id + '-form'"></preview-form>

          <preview-button
            :block="block"
            :key="block.id + '-button'"
            @toggle="toggleBlock(block)"
            @remove="removeBlock(block)"
            @up="upBlock(block)"
            @down="downBlock(block)"
          ></preview-button>
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

import PreviewButton from './__preview-button.vue';
import PreviewForm from './__preview-form.vue';
import PreviewBlock from './__preview-block.vue';

export default {
  name: 'preview-pane',
  components: {
    PreviewButton,
    PreviewForm,
    PreviewBlock
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

<style lang="scss">
@import '../../assets/scss/utils/utilities.scss';

.fc-preview {
  overflow: scroll;
  position: relative;
  flex: 1;
  margin-left: 1.8rem;
  margin-right: 1.8rem;
  background-color: $white;
  box-shadow: 0 .3rem 1rem rgba($black, 0.24), 0 .3rem 1rem rgba($black,
    0.16);
  @include transition(null, 0.3s);

  &__checkbox {
    &:checked {
      + .fc-preview__label {
        outline-color: $grey-l5;
      }

      ~ .fc-block__edit {
        display: block;
      }
    }
  }

  &__label {
    display: block;
    outline: 0.1rem dashed transparent;
    outline-offset: -0.1rem;
    @include transition(opacity, 0.2s);

    &:hover {
      outline-color: $grey-l5;
    }
  }

  &__save {
    position: fixed;
    right: 1.8rem;
    bottom: 2.8rem;
    z-index: 101;
    width: 4.5rem;
    height: 4.5rem;
    background-color: $accent;
    border-radius: percentage(1/2);
    color: $white;
    box-shadow: 0 .3rem 1rem rgba($black, 0.24), 0 .3rem 1rem rgba($black,
      0.16);
    @include transition(null, 0.3s);

    .fc-composer--openmenu & {
      right: $sidebar-size + 2.8rem;
    }
  }
}

.fc-block {
  position: relative;

  &__item {
  }

  &__edit {
    display: none;
    position: relative;
    margin: 0 1.8rem 1.2rem;
  }

  &__form {
    padding: 1.2rem 1.2rem;
    background-color: $dimmed;

    &__fieldset {
      padding: 1.8rem 1.8rem;
      border-radius: 0.5rem;
      background-color: $white;

      & + & {
        margin-top: 1rem;
      }
    }

    &__label {
      display: block;
      margin-bottom: 1rem;
      font-size: 1.2rem;
      border-bottom: 0.1rem solid $grey-l5;
    }

    &__name {
      display: inline-block;
      font-size: 1.4rem;
      text-transform: uppercase;
      margin-bottom: -0.1rem;
      border-bottom: 0.1rem solid $secondary;
    }

    &__input {
      box-sizing: border-box;
      display: block;
      border: 0 none;
      padding-left: 0.8rem;
      padding-right: 0.8rem;
      width: percentage(1);
      height: 4.2rem;
      font-size: 1.6rem;
      background-color: $blue-l2;
      border-radius: 0.5rem;
      color: $white;
      outline: 0 none;
      @include transition(null, 0.2s);

      &:focus {
        background-color: $accent;
        color: $white;
      }
    }
  }

  &__utils {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    display: flex;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    background-color: $dimmed;
    transform: translateY(-100%);

    &__btn {
      display: flex;
      flex: 1;
      padding: 0.4rem 0.2rem;

      &:hover {
        .material-icons {
          color: $primary;
        }
      }
    }

    .material-icons {
      color: $placehold;
    }
  }
}
</style>
