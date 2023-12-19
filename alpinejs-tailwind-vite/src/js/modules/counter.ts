//Alpine custom component

export function Counter() {
  return {
    name: "Counter",
    counter: 0,
    increase() {
      this.counter++;
    },
  };
}
