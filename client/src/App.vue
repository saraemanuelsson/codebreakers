<template>
  <div id="app">
    <grid :cards="cards"></grid>
  </div>
</template>

<script>
import Grid from "./components/Grid.vue";
import CodeBreakerService from "./services/CodebreakerService";
export default {
  name: 'App',
  components: {
    "grid": Grid
  },
  data() {
    return {
      cards: [{colour: "blue"}, {colour: "red"}, {colour: "neutral"}, {colour: "black"}],
      words: [{word: "guitar"}, {word: "cat"}, {word: "table"}, {word: "ukulele"}]
    }
  },
  mounted() {
    // this.fetchCards();
    // this.createCard();
  },
  methods: {
    
    shuffle() {
      const shuffled = this.cards.sort(() => 0.5 - Math.random());
      return shuffled;
    },
    cardSplice(cards) {
      const shuffledWords = cards.shuffle()
      return shuffledWords.splice(0, 25)
    },
    fetchCards() {
      CodeBreakerService.getCards()
      .then(cards => {
        this.cards = cards
      })
      CodeBreakerService.getWords()
      .then(words => {
        this.words = this.cardSplice(words)
      })

    }
  },
  computed: {
    createCard(){
      this.cards.map((card, i) => {
        card.word =  this.words[i].word,
        card.isClicked = false,
        card.isHidden = true
      })
    }
  }
}
</script>

<style>
#app {

}
</style>
