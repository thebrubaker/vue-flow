<template>
  <div class="spinner">
    <div class="bounce1" :style="style"></div>
    <div class="bounce2" :style="style"></div>
    <div class="bounce3" :style="style"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  props: {
    size: {
      default: '8px',
    },
    color: {
      default: 'white',
    },
  },
  computed: {
    style() {
      return {
        width: this.size,
        height: this.size,
        'background-color': this.color,
      };
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.spinner > div {
  width: 8px;
  height: 8px;
  background-color: white;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
