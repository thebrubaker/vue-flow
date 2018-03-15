<template>
  <div>
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
    primaryColor () {
      return variables.primary
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
  @import './styles';
</style>