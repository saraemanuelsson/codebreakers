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
      cards: [],
      words: []
    }
  },
  mounted() {
    this.fetchCards();

  },
  methods: {
    
    shuffle(array) {
      const shuffled = array.sort(() => 0.5 - Math.random());
      return shuffled;
    },
    cardSplice(cards) {
      const shuffledWords = this.shuffle(this.words)
      return shuffledWords.splice(0, 25)
    },
    fetchCards() {
      CodeBreakerService.getCards()
      .then(cards => {
        this.cards = cards
      })

      .then(() => this.shuffle(this.cards))
      CodeBreakerService.getWords()
      .then(words => {        
        this.words = words
      })
      .then(() => {
        this.shuffle(this.words)
        this.createCard()
      })
    },
    createCard(){
      return this.cards.map((card, i) => {
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
