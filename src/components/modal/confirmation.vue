<template>
  <div class="confirmation-modal">
    <header>
      <h1>Please Confirm</h1>
      <i class="material-icons" @click="cancel" :disabled="loading">close</i>
    </header>
    <main>
      {{ body }}
    </main>
    <footer>
      <button type="cancel" @click="cancel" :disabled="loading">
        {{ cancelText }}
      </button>
      <button :class="{warning}" type="submit" @click="confirm" :disabled="loading">
        <BounceSpinner v-if="loading" color="white" />
        <span v-else>{{ confirmText }}</span>
      </button>
    </footer>
  </div>
</template>

<script>
import BounceSpinner from 'src/components/spinners/bounce';

export default {
  data() {
    return {
      loading: false,
    };
  },
  components: {
    BounceSpinner,
  },
  props: {
    body: {
      type: String,
      default: 'Are you sure you want to proceed?',
    },
    confirmText: {
      type: String,
      default: 'Confirm',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
    warning: {
      type: Boolean,
      default: false,
    },
    confirmCallback: {
      type: Function,
      default: close => close(),
    },
    cancelCallback: {
      type: Function,
      default: () => {},
    },
  },
  computed: {},
  methods: {
    confirm() {
      this.loading = true;
      this.confirmCallback(this.close.bind(this));
    },
    cancel() {
      this.cancelCallback();
      this.close();
    },
    close() {
      this.loading = false;
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.confirmation-modal {
  width: 100%;
  max-width: 600px;
  background-color: white;
  border: 1px solid $grey;
  border-radius: 6px;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.05);
  border-bottom: rgba(0, 0, 0, 0.2);
}
h1 {
  font-size: 1em;
}
i {
  font-size: 16px;
  cursor: pointer;
  &[disabled] {
    pointer-events: none;
    cursor: default;
  }
}
main {
  padding: 20px;
  font-size: 1.2em;
  line-height: 2em;
  border-bottom: 1px solid #ccc;
  padding: 40px 20px;
}
button {
  @include button;
  margin: 0 10px;
  &[type='cancel'] {
    border: 1px solid $grey;
    color: $dark-grey;
    background-color: white;
  }
  &.warning {
    background-color: $red;
  }
  &:last-of-type {
    margin-right: 0px;
  }
}
footer {
  display: flex;
  padding: 20px;
  justify-content: flex-end;
}
</style>
