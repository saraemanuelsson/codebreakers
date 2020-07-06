<template>
  <div id="app">
    <button v-on:click="toggleGameState">{{ gameStateText }}</button>
    <score-bar id="score-bar" :redScore="redScore" :blueScore="blueScore" :gameOn="gameOn"></score-bar>
    <grid id="grid" v-bind:class="[turn === 'Red' ? Red : Blue]" :cards="cards" :gameOn="gameOn"></grid>
    <user id="user-bar" :cards="cards" :gameOn="gameOn"></user>
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
      turn: "Red",
      redScore: 9,
      blueScore: 8,
      round: 0
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
      this.saveNewMove();
      this.checkIfWrongColour(card);
      this.addPointsToRightTeam(card);
      
    },

    checkIfWrongColour(card){
        if (card.colour !== this.turn) {
        this.nextTurn()
      };
    },

    addPointsToRightTeam(card){
        if (card.colour === 'Blue') {
        this.blueScore -= 1
        return this.blueScore
        } else if (card.colour === 'Red') {
        this.redScore -= 1
        return this.redScore
        } 
    },
    
    nextTurn(){
      
      if(this.turn === "Red") {
        this.turn = "Blue"
      } else {
        this.turn = "Red"
      }
      this.saveNewMove()
 
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
        this.words = this.shuffle(result[0])
        this.cards = this.createCard(result[1])
      })

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
      this.shuffle(this.cards)
      this.saveNewGameStatus()
    },

    saveNewGameStatus() { 
      CodeBreakerService.getGameStatus()
      .then(gameStatuses => {
        const gameStatus = gameStatuses[0]
        this.gameOn = true; 
        this.redTurn = true;
        this.round = this.round + 1;    
        const updatedGameStatus = {
          ...gameStatus,
          gameOn: this.gameOn,
          cards: this.cards,
          round: this.round,
          redScore: this.redScore,
          blueScore: this.blueScore,
          turn: this.turn
      }
      
      CodeBreakerService.updateGameStatus(updatedGameStatus);
      })
    },

    saveNewMove() { 
      CodeBreakerService.getGameStatus()
      .then(gameStatuses => {
        const gameStatus = gameStatuses[0]   
        const updatedGameStatus = {
          ...gameStatus,
          cards: this.cards,
          turn: this.turn
      }
      
      CodeBreakerService.updateGameStatus(updatedGameStatus);
      })
    }
  }
}
</script>

<style>

html {
  background: url('../public/Codenamestable.png') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

#app {
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
 

#grid .Blue {
  box-shadow: -5px 7px 62px 16px rgb(10, 136, 177);
}
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
