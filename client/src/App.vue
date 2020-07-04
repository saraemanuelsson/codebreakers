<template>
  <div id="app">
    <grid :cards="cards"></grid>
  </div>
</template>

<script>
import Grid from "./components/Grid.vue";

export default {
  name: 'App',
  components: {
    "grid": Grid
  },
  data() {
    return {
      cards: [
        {colour: 'Red',
        word: "Mammoth"},
        {colour: 'Red',
        word: "Beethoven"},
        {colour: 'Red',
        word: "Big"},
        {colour: 'Red',
        word: "Bird"},
        {colour: 'Red',
        word: "Boat"},
        {colour: 'Red',
        word: "Crow"},
        {colour: 'Red',
        word: "Dart"},
        {colour: 'Red',
        word: "Day"},
        {colour: 'Red',
        word: "Mascot"},
        {colour: 'Blue',
        word: "Mexico"},
        {colour: 'Blue',
        word: "Midsummer"},
        {colour: 'Blue',
        word:"Mouse"},
        {colour: 'Blue',
        word:"Cat"},
        {colour: 'Blue',
        word:"Lake"},
        {colour: 'Blue',
        word:"Sky"},
        {colour: 'Blue',
        word:"Plane"},
        {colour: 'Blue',
        word:"Moon"},
        {colour: 'Neutral',
        word:"Mouse"},
        {colour: 'Neutral',
        word: 'calendar'},
        {colour: 'Neutral',
        word: 'monitor'},
        {colour: 'Neutral',
        word: 'guitar'},
        {colour: 'Neutral',
        word: 'desk'},
        {colour: 'Neutral',
        word: 'alligator'},
        {colour: 'Neutral',
        word: 'dog'},
        {colour: 'Black',
        word: 'apple'}
      ]
    }
  },
  mounted() {
    this.shuffle();
  },
  methods: {
    shuffle() {
      const shuffled = this.cards.sort(() => 0.5 - Math.random());
      return shuffled;
    }
  }
}
</script>

<style>
#app {

}
</style>
