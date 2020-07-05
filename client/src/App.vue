<template>
  <div id="app">
    <button type="submit" v-on:click="setCurrentCards">Start Game</button>
    <score-bar id="score-bar" :redScore="redScore" :blueScore="blueScore"></score-bar>
    <grid id="grid" :cards="currentCards"></grid>
    <button type="submit" value="test">Placeholder</button>
  </div>
</template>

<script>
import Grid from "./components/Grid.vue";
import ScoreBar from "./components/ScoreBar"
import CodeBreakerService from "./services/CodebreakerService";
export default {
  name: 'App',
  components: {
    "grid": Grid,
    "score-bar": ScoreBar
  },
  data() {
    return {
      cards: [],
      words: [],
      currentCards: [],
      redScore: 9,
      blueScore: 8
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
*{
  margin: 0;
}
#score-bar{
  grid-column: 2/5;
}
#app {
  background-image: url('../public/Codenamestable.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position-x: left;
  background-position-y: bottom;
  font-family: "Anton";
  display: grid;
  grid-template-columns: 26% 16% 16% 16% 26%;
}
#grid {
  border: 1rem solid rgba(75, 72, 72, 0.719);
  background-color: rgba(0, 0, 0, 0.678);
  grid-column: 2/5;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  border-radius: 2%;
  padding: 0.8vw;
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
