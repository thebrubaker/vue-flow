<template>
  <div class="page">
    <transition name="fade">
      <div v-if="loading" class="loading"></div>
    </transition>
    <div class="panel creative">
      <div class="background"></div>
      <div class="headline">
        <h1>Build.</h1>
        <h1>Better.</h1>
        <h1>Apps.</h1>
      </div>
      <router-link to="/example/sub-1">Visit Sub 1</router-link>
      <router-link to="/example/sub-2">Visit Sub 2</router-link>
      <router-link to="/example/sub-3">Visit Sub 3</router-link>
    </div>
    <div class="panel routes">
      <transition name="fade">
        <router-view class="panel-container"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapComputed } from './store';
import variables from 'src/styles/variables.scss';
import Bounce from 'src/components/spinners/bounce';

export default {
  components: {
    Bounce
  },
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapComputed([
      'loading',
    ]),
    color () {
      return variables.primary
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
  @import './styles';

  .page {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    &.creative {
      background: $primary;
      color: white;      
    }
    &.routes {
      background: white;
      color: lighten($black, 5);
    }
  }

  .panel-container {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .loading {
    position: absolute;
    z-index: 2;
    top: 0;
    width: 100%;
    height: 5px;
    background: transparent;
    &:after {
      content: '';
      top: 0;
      position: absolute;
      width: 100%;
      height: 5px;
      background: linear-gradient(45deg, transparent, $primary, transparent);
      animation: loading 2s linear infinite;
    }
  }

  @keyframes loading {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(100%)
    }
  }

  .fade {
    &-enter-active, &-leave-active {
      transition: all 0.6s ease;
    }
    &-enter, &-leave-to {
      opacity: 0;
    }
  }

  .background {
    @include background-multiply('./assets/guy-with-paint.jpeg');
  }

  .headline {
    text-align: center;
    margin-bottom: 70px;
  }

  h1 {
    font-size: 5em;
    margin: 0;
  }

  a {
    background: transparent;
    border: 2px solid white;
    color: white;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1em;
    font-weight: 600;
    height: 60px;
    width: 340px;
    border-radius: 35px;
    &:before {
      content: '';
      height: 60px;
      width: 340px;
      border-radius: 35px;
      position: absolute;
      background: white;
      opacity: 0;
      z-index: -1;
      transition: all 0.2s;
    }
    &:hover, &.router-link-active {
      color: $primary;
    }
    &:hover:before, &.router-link-active:before {
      opacity: 1;
    }
  }
</style>