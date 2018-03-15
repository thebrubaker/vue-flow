<template>
  <div>
    <h1>Sub 3</h1>
  </div>
</template>

<script>
import { atLeast } from 'src/utilities/promise';

export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  methods: {},
  created() {
    atLeast(1000).then(() => {
      this.$store.commit('pages/example/loading', false);
    });
  }
}
</script>

<style lang="scss">

</style>