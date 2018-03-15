<template>
  <div class="private-layout">
    <transition :name="transitionName" :mode="transitionMode">
      <router-view class="content"></router-view>
    </transition>
  </div>
</template>

<script>
import { mapComputed } from '../store';
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
      'transitionName',
      'transitionMode',
    ]),
    primaryColor () {
      return variables.primary
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
  @import './styles';

  .private-layout {
    display: flex;
    position: relative;
  }

  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
