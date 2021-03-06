<template>
  <header class="fc-header">
    <h1 class="fc-header__h">FastComposer</h1>
    <div class="fc-header__content">
      <ul class="fc-header__favorite-layouts">
        <li class="fc-header__favorite-layout" v-for="(layout, index) in favoriteLayouts" :key="index">
          <button class="fc-header__favorite-btn" @click="addLayer(layout)">
            <img :src="layout.icon" alt="" />
            {{ layout.id }}
          </button>
        </li>
      </ul>
    </div>
    <div class="fc-header__right">
      <div class="fc-header__info">
        <span class="fc-header__layout-count">사용된 레이어 수: {{ layerCount }}개 - 점검 할 레이어: {{ warnCount }}개</span>
        <span class="fc-header__save-time" v-show="saveTime">최종저장 시간: {{ saveTime }}</span>
      </div>
      <div class="fc-header__utils">
        <button @click="onToggleDeviceMode"><span class="material-icons">devices</span></button>
        <button @click="showInfoTags"><i class="material-icons">help</i></button>
        <button class="fc-utils__btn" @click="showLayerPanel"><i class="material-icons">add</i></button>
        <button @click="validateLayer">
          <i class="material-icons">check</i>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    methods: {
      validateLayer() {
        this.$emit('validate');
      },
      showLayerPanel($event) {
        this.$emit('show-layout-panel', $event);
      },
      showInfoTags() {
        this.$emit('show-info-tags');
      },
      addLayer(layout) {
        this.$emit('add', layout);
      },
      onToggleDeviceMode() {
        this.$emit('toggle-device-mode');
      },
    },
    data() {
      return {
        saveTime: null,
      }
    },
    computed: {
      favoriteLayouts() {
        return this.layouts.filter((layout) => this.favoriteLayoutIds.includes(layout.id));
      }
    },
    props: {
      favoriteLayoutIds: {
        type: Array,
        default() {
          return [];
        }
      },
      notificationMessage: {
        type: String,
        default() {
          return {
            message: '',
          }
        }
      },
      notificationType: {
        type: String,
        default() {
          return 'default'
        }
      },
      layouts: {
        type: Array,
        default() {
          return [];
        }
      },
      layerCount: {
        type: Number,
        default() {
          return 0;
        }
      },
      warnCount: {
        type: Number,
        default() {
          return 0;
        }
      }
    },
    watch: {
      notificationType (value) {
        if (value === 'success') {
          const d = new Date();

          this.saveTime = `
            ${d.getFullYear().toString().padStart(4, '0')}.
            ${(d.getMonth()+1).toString().padStart(2, '0')}.
            ${d.getDate().toString().padStart(2, '0')}
            ${d.getHours().toString().padStart(2, '0')}:
            ${d.getMinutes().toString().padStart(2, '0')}:
            ${d.getSeconds().toString().padStart(2, '0')}
          `;
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/style';

  .fc-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 101;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 1.8rem;
    width: percentage(1);
    height: $header-size;
    background-color: transparent;
    transform: none; // admin과 충돌 이슈
    transition: none;  // admin과 충돌 이슈

    &__favorite-layouts {
      display: flex;
      width: 100%;
      height: 7.1rem;
      overflow-x: scroll;
    }
    &__favorite-layout {
      margin-left: 1rem;
      text-align: center;
      &:first-child {
        margin-left: 0;
      }
    }
    &__favorite-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        max-width: none;
      }
    }

    button {
      color: $white;
    }

    &__content {
      height: 100%;
      padding-top: 1rem;
    }

    &__h {
      width: 32rem;
      font-size: 1.8rem;
      color: $white;
    }

    &__right {
      width: 26.1rem;
      margin-left: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      padding-left: 2.1rem;
      > div {
        color: $white;
      }
    }
    &__info {
      display: flex;
      flex-direction: column;
    }
  }
</style>
