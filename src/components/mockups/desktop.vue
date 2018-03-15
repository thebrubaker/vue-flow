<template>
<div>
  <div class="aspect-ratio">
    <div class="container">
      <header>
        <i class="close"></i>
        <i class="min"></i>
        <i class="expand"></i>
      </header>
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.aspect-ratio {
  background: white;
  box-shadow: 2px 2px 11px 3px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 100%;
  padding-bottom: 70%;
  position: relative;
}
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
header {
  width: 100%;
  height: 30px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 7px;
}
i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 5px;
  &.close {
    background: $red;
  }
  &.min {
    background: $yellow;
  }
  &.expand {
    background: $green;
  }
}
main {
  width: 100%;
  height: 100%;
  background: $blue;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  position: relative;
  overflow: hidden;
  flex: 1;
}
</style>
