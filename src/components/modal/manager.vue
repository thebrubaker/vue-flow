<template>
  <div class="modal-container">
    <transition name="fade">
      <div class="container" v-if="component">
        <component :is="component" v-bind="props" @close="close" />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapComputed } from 'src/utilities/vuex';
import ConfirmationModal from './confirmation';

export default {
  name: 'ModalContainer',
  data() {
    return {
      customComponent: null,
      componentMap: {
        confirm: ConfirmationModal
      }
    };
  },
  computed: {
    ...mapComputed('modal', ['name', 'props']),
    component() {
      if (this.customComponent) {
        return this.customComponent;
      }

      return this.name ? this.componentMap[this.name] : null;
    }
  },
  methods: {
    confirm(props) {
      if (typeof props === 'string') {
        props = {
          body: props
        };
      }
      this.open('confirm', props);
    },
    close() {
      this.customComponent = null;
      this.name = null;
      this.props = null;
    },
    open(modal, props) {
      if (typeof modal === 'string') {
        this.name = modal;
      } else {
        this.customComponent = modal;
      }
      this.props = props;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
