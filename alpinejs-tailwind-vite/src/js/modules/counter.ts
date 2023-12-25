//Alpine custom component

export function Counter() {
  return {
    init() {},
    name: 'Counter',
    counter: this.$persist(0),
    increase() {
      this.counter++
    },
    reset() {
      this.counter = 0
    },
  }
}
