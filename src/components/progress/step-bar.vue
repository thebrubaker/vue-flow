<template>
  <div class="progress-bar">
    <div class="bar-container">
      <div class="bar" :style="barStyle"></div>
    </div>
    <div class="steps">
      <div class="step" 
        v-for="step in steps"
        :key="step"
        :class="isComplete(step)">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      step: 1,
      steps: 4
    }
  },
  props: {
    color: {
      required: false,
      type: String,
      default: '#363795',
    },
    steps: {
      required: true,
      type: Number,
    },
  },
  computed: {
    barStyle () {
      const translate = (this.steps - this.step) / (this.steps - 1) * 100
      return {
        'background-color': this.color,
        'transform': `translateX(-${translate}%)`,
      }
    }
  },
  methods: {
    next () {
      if (this.step === this.steps) {
        return
      }

      this.step++
    },
    reset () {
      this.step = 1
    },
    isComplete(step) {
      return {
        complete: step <= this.step
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .page {
    width: 600px;
    margin: 20px;
  }
  button {
    @include button;
    width: 200px;
  }
  .progress-bar {
    position: relative;
    width: 100%;
    height: 14px;
    margin: 40px 0;
  }
  .bar-container {
    height: 2px;
    margin: 6px 0;
    width: 100%;
    background-color: darken(white, 5);
    position: absolute;
    overflow: hidden;
  }
  .bar {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    transition: all 1.05s;
  }
  .steps {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .step {
    border-radius: 100px;
    background-color: darken(white, 5);
    width: 14px;
    height: 14px;
    overflow: hidden;
    position: relative;
    z-index: 1;
    &:after {
      content: '';
      background-color: $primary;
      width: 14px;
      height: 14px;
      position: absolute;
      transform: translateX(-100%);
      transition: all 0s;
    }
    &.complete:after {
      transform: translateX(0);
      transition: all 0.2s 0.82s;      
    }
  }
</style>