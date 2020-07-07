<template>
  <div id="app">
    <button id="toggle-game-button" v-on:click="toggleGameState">{{ gameStateText }}</button>
    <menu-button id="menu" :gameOn="gameOn"></menu-button>
    <score-bar id="score-bar" :redScore="redScore" :blueScore="blueScore" :gameOn="gameOn"></score-bar>
    <grid id="grid" :cards="cards" :gameOn="gameOn"></grid>
    <result-display :team="team" :wonGame="wonGame"></result-display>
    <user id="user-bar" :cards="cards" :gameOn="gameOn"></user>
  </div>
</template>

<script>
import {eventBus} from "@/main";
import Grid from "./components/Grid.vue";
import ScoreBar from "./components/ScoreBar";
import CodeBreakerService from "./services/CodebreakerService";
import User from "./components/User";
import ScoreCard from "./components/ScoreCard";
import Menu from "./components/Menu";
import Result from "./components/Result";

export default {
  name: 'App',
  components: {
    "grid": Grid,
    "score-bar": ScoreBar,
    "user": User,
    "score-card": ScoreCard,
    "menu-button": Menu,
    "result-display": Result
  },
  data() {
    return {
      gameOn: false,
      cards: [],
      words: [],
      turn: "Red",
      redScore: 9,
      blueScore: 8,
      round: 0,
      team: "",
      wonGame: false
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
      
      this.addPointsToRightTeam(card);
      
      if (card.colour === "Black") {
        this.team = this.turn;
      } else if (this.redScore === 0 || this.blueScore === 0) {
        this.team = card.colour;
        this.wonGame = true;
      };
      
      this.checkIfWrongColour(card);
      this.saveNewMove();
    },

    endGame(){
      this.turn = "Red";
      this.redScore = 9;
      this.blueScore = 8;
      this.team = "";
      this.wonGame = false;
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
        this.cards = this.shuffle(this.createCard(result[1]))
      })

    },
    createCard(cardsFromDatabase){
      this.shuffle(this.words)
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
      this.cards = this.shuffle(this.createCard(this.cards))
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
@import url(https://fonts.googleapis.com/css?family=Bungee:regular);
html {
  background: url('../public/Codenamestable.png') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  font-size: 16px;
}

#menu{
  grid-column: 5/6;
}
#user-bar{
  padding: 15%;
  grid-column: 3/5;
}
#score-bar{
  grid-column: 2/5;
}
#app {
  /* background-image: url('../public/Codenamestable.png'); */
  background-size: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position-x: left;
  background-position-y: bottom;
  font-family: "Bungee";
  display: grid;
  grid-template-columns: 29% 14% 14% 14% 29%;
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
#toggle-game-button{
  position: relative;
  top: 100%;
  border-style: none;
  height: 4vw;
  font-size: 1.5em;
  grid-column: 3/4;
  font-family: "Bungee";
  font-size: 1.5vw;
  border-style: none;
  border-radius: 12px;
  outline: none;
  background-color: rgb(58, 54, 54);
  color: rgba(255, 248, 220, 0.733);
}

#toggle-game-button:hover{
  background-color: black;
  color: white;
}
</style>
