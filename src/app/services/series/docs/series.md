# Series

A series is a tool for managing the logic flow of a process or a series of steps. It exposes a dead-simple API for traversing the steps in a series, and exposes callback functions for each stage of in the lifecycle of moving between steps.

## Example

``` js
const step1 = {
  init () {
    this.$router.push('form/registration/contact')
  },
  computed: {
    formData () {
      return this.$store.getters['series/registration/formData']
    },
    loading: {
      get () {
        return this.$store.getters['series/registration/loading']
      },
      set (newValue) {
        this.$store.commit('series/registration/loading', true)
      }
    }
  },
  beforeNext (next) {
    this.loading = true
    this.$http.post('https://api.com/registration', this.formData).then(() => {
      next()
    })
  },
  afterNext () {
    this.loading = false
  }
}

const step2 = {
  init () {
    this.$router.push('form/registration/terms-of-service')
  },
  // step2 config
}
```