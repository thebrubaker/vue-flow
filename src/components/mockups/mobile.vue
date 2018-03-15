<template>
<div>
  <div class="aspect-ratio">
    <div class="container">
      <header></header>
      <main>
        <slot></slot>
      </main>
      <footer></footer>
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
  box-shadow: 2px 2px 11px 2px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 0 15px;
  width: 100%;
  padding-bottom: 160%;
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
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  &::after {
    content: '';
    width: 50px;
    height: 3px;
    border-radius: 10px;
    background: darken(white, 10);
  }
}
main {
  background: $blue;
  position: relative;
  overflow: hidden;
  flex: 1;
}
footer {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid darken(white, 20);
  }
}
</style>
