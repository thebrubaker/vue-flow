<template>
  <div class="server-error-modal">
    <header>
      <h1>Server Error - Status {{ response.status }}</h1>
    </header>
    <main>
      <iframe :srcdoc="response.data"></iframe>
    </main>
    <footer>
      <button type="button" @click="$emit('close')">
        Close
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    response: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.server-error-modal {
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
