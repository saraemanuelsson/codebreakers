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
@import url(https://fonts.googleapis.com/css?family=Anton:regular);
#app {font-family: "Anton";
  display: grid;
  grid-template-columns: 26% 16% 16% 16% 26%;
}
#grid {column-gap: 0.2vw;
  /* box-shadow: 1em 1em 1px 1px rgb(red, green, rgb(1, 1, 37)); */
  border: 1rem solid rgb(75, 72, 72);
  background-color: rgb(0, 0, 0);
  grid-column: 2/5;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  border-radius: 2%;
  padding: 0.5vw;
}
button{
  color: rgb(89, 175, 2);
  border-style: none;
  font-family: "Anton";
  height:50px;
  grid-column: 3/4;
  margin: 10%;
}

</style>
