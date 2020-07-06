<template>
  <div id="app">
    <button v-on:click="toggleGameState">{{ gameStateText }}</button>
    <score-bar id="score-bar" :redScore="redScore" :blueScore="blueScore"></score-bar>
    <grid id="grid" :cards="cards" :gameOn="gameOn"></grid>
    <user id="user-bar" :cards="cards"></user>
  </div>
</template>

<script>
import {eventBus} from "@/main";
import Grid from "./components/Grid.vue";
import ScoreBar from "./components/ScoreBar"
import CodeBreakerService from "./services/CodebreakerService";
import User from "./components/User"
import ScoreCard from "./components/ScoreCard"
export default {
  name: 'App',
  components: {
    "grid": Grid,
    "score-bar": ScoreBar,
    "user": User,
    "score-card": ScoreCard
  },
  data() {
    return {
      gameOn: false,
      cards: [],
      words: [],
      // currentCards: [],
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

    eventBus.$on("display-to-app", (cards) => {
      this.cards = cards
    })
    eventBus.$on("hide-to-app", (cards) => {
      this.cards = cards
    })

    eventBus.$on("card-selected", card => this.clickCard(card));
    
  },
  computed: {
    gameStateText() {
      return this.gameOn ? 'End turn' : 'Start game'
    }
    
  },
  methods: {

    clickCard(card) {
      const index = this.cards.indexOf(card);

      this.cards[index].isClicked = true;

      if (this.cards[index].colour === 'Blue') {
        this.blueScore -= 1
        return this.blueScore
      }

      if (this.cards[index].colour === 'Red') {
        this.redScore -= 1
        return this.redScore
      }
      
    },
    
    nextTurn(){
      this.redTurn = !this.redTurn
      this.blueTurn = !this.blueTurn
    },
    
    shuffle(array) {
      const shuffled = array.sort(() => 0.5 - Math.random());
      return shuffled;
    },

    fetchCards() {
      
      const words = CodeBreakerService.getWords()
      const cards = CodeBreakerService.getCards()
      
      const promises = [words, cards]
      
      Promise.all(promises)
      
      .then((result) => {        
        this.words = result[0]
        this.cards = this.createCard(result[1])
      })
      .then(() => {
        this.shuffle(this.words)
      })
      .then(() => this.createCard())
      .then(() => this.shuffle(this.cards))

    },
    createCard(cardsFromDatabase){
      return cardsFromDatabase.map((card, i) => {
        return {
          ...card,
          word: this.words[i].word,
          isClicked: false,
          isHidden: true
        }
      })
    },

    toggleGameState (){
      return this.gameOn ? this.nextTurn() : this.startGame()
    },

    startGame() {
      // this.shuffle(this.cards)
      this.fetchGameStatus()
    },

    fetchGameStatus() { 
      CodeBreakerService.getGameStatus()
      .then(gameStatuses => {
        const gameStatus = gameStatuses[0]
        // this.setCurrentCards()
        this.gameOn = true; 
        this.redTurn = true;
        this.round = this.round + 1;
      
        console.log("game status", gameStatus);
    
        const updatedGameStatus = {
          ...gameStatus,
          gameOn: this.gameOn,
          cards: this.cards,
          round: this.round
      }
      
      CodeBreakerService.updateGameStatus(updatedGameStatus);
      })
    }


    // setCurrentCards(){
    //   this.shuffle(this.cards)
    // }
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Bungee:regular);
*{margin: 0;
}
#user-bar{
  grid-column: 3/5;
}
#score-bar{
  grid-column: 2/5;
}
#app {
  background-image: url('../public/Codenamestable.png');
  background-size: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position-x: left;
  background-position-y: bottom;
  font-family: "Bungee";
  display: grid;
  grid-template-columns: 26% 16% 16% 16% 26%;
}
#grid {
  box-shadow: -5px 7px 62px 16px rgb(177, 24, 24);
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
