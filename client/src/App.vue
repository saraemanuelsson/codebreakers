<template>
  <div id="app">
    <button height="50px" type="submit" v-on:click="setCurrentCards">Start Game</button>
    <grid id="grid" :cards="currentCards"></grid>

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
      words: [],
      currentCards: []
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
      
      const promise1 = CodeBreakerService.getWords()
      .then(words => {        
        this.words = words
      })
      .then(() => {
        this.shuffle(this.words)
      })

      const promise2 = CodeBreakerService.getCards()
      .then(cards => {
        this.cards = cards
      })

      const promises = [promise1, promise2]

      Promise.all(promises)
      .then(() => this.createCard())
      .then(() => this.shuffle(this.cards))
    },
    createCard(){
      return this.cards.map((card, i) => {
        card.word = this.words[i].word,
        card.isClicked = false,
        card.isHidden = true
      })
    },

    setCurrentCards(){
      // this.shuffle(this.words)
      this.currentCards = this.cards
    }
  }
}
</script>

<style>
#app {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
}
#grid {
  background-color: rgba(0, 0, 255, 0.356);
  grid-column: 2/5;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
}
button{
  height:100px;
  grid-column: 3/4;
}

</style>
