<template>
  <div id="app">
    <button v-on:click="toggleGameState">{{ gameStateText }}</button>
    <score-bar id="score-bar" :redScore="redScore" :blueScore="blueScore"></score-bar>
    <grid id="grid" :cards="currentCards"></grid>
    <button value="test">Placeholder</button>
  </div>
</template>

<script>
import {eventBus} from "@/main";
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
      gameOn: false,
      cards: [],
      words: [],
      currentCards: [],
      redTurn: true,
      blueTurn: false,
      redScore: 9,
      blueScore: 8,
      round: 0
      // selectedCard: null
    }
  },
  mounted() {
    this.fetchCards();

    eventBus.$on("card-selected", card => this.clickCard(card));
    
  },
  computed: {
    gameStateText() {
      return this.gameOn ? 'End turn' : 'Start game'
    }
    
  },
  methods: {


    clickCard(card) {
      const index = this.currentCards.indexOf(card);
      this.currentCards[index].isClicked = true;
      // this.currentCards[index].isHidden = false;
    },
    
    nextTurn(){
      
      this.redTurn = !this.redTurn
      this.blueTurn = !this.blueTurn
 
    },
    
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

    toggleGameState (){
      return this.gameOn ? this.nextTurn() : this.startGame()
    },

    startGame() {
      const gameStatus = this.fetchGameStatus()

      this.setCurrentCards()
      this.gameOn = true; 
      this.redTurn = true;
      this.round = this.round + 1;
      

      const updatedGameStatus = {
        ...gameStatus,
        gameOn: this.gameOn,
        currentCards: this.currentCards,
        round: this.round
      }
      
      CodeBreakerService.updateGameStatus(updatedGameStatus);
    },

    fetchGameStatus() { 
      CodeBreakerService.getGameStatus()
      .then(gamestatus => {
        const game = gamestatus[0]
        return game
      })
    },


    setCurrentCards(){
      this.shuffle(this.cards)
      this.currentCards = this.cards
    }
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Bungee:regular);
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
  font-family: "Bungee";
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
