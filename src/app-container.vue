<script>
export default {
  name: 'app',
  computed: {
    transitionName() {
      return this.$store.getters['pages/transitionName'];
    },
    transitionMode() {
      return this.$store.getters['pages/transitionMode'];
    },
  },
  render(createElement) {
    return createElement('div', { attrs: { id: 'app' } }, [
      createElement(
        'transition',
        { props: { name: this.transitionName, mode: this.transitionMode } },
        [createElement('router-view', { attrs: { class: 'page' } })],
      ),
    ]);
  },
};
</script>

<style lang="scss">
@import 'app';
</style>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}
.page {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: absolute;
}
</style>
