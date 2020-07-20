<template>
  <div id="app">
    <button id="toggle-game-button" v-on:click="toggleGameState">{{ gameStateText }}</button>
    <menu-button id="menu" :teamAssigned1="teamAssigned1" :teamAssigned2="teamAssigned2" :gameOn="gameOn" :blueWins="blueWins" :redWins="redWins" :round="round" :redScore="redScore" :blueScore="blueScore" :assassinClicked="assassinClicked"></menu-button>
    <score-bar id="score-bar" :redScore="redScore" :blueScore="blueScore" :gameOn="gameOn"></score-bar>
    <grid class="grid" v-bind:class="{blueTurn:(turn === 'Blue')}" :cards="cards" :gameOn="gameOn" ></grid>
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
import { socketIo } from "@/main"

export default {
  name: 'App',
  components: {
    "grid": Grid,
    "score-bar": ScoreBar,
    "user": User,
    "score-card": ScoreCard,
    "menu-button": Menu,
    "result-display": Result,
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
      wonGame: false,
      wonRound: false,
      gameStatus: {},
      assassinClicked: false,
      redWins: 0,
      blueWins: 0,
      teamAssigned1: "",
      teamAssigned2: ""
    }
  },

  mounted() {
    this.fetchCards();
    this.fetchGameStatus();
    socketIo.on("connect", function(){
      console.log("connected");
    })
    socketIo.on("disconnect", function(){
      console.log("disconnected");
    })

    socketIo.on("test", function(data){
      socketIo.emit("game-status", this.gameStatus)
      
    })

    socketIo.on("updated-game", function(data){
      eventBus.$emit("change", data);
    })

    eventBus.$on("change", (data) => {
      this.redScore = data.redScore,
      this.blueScore = data.blueScore,
      this.turn = data.turn,
      this.cards = data.cards,
      this.gameOn = data.gameOn,
      this.team = data.team,
      this.wonGame = data.wonGame,
      this.assassinClicked = data.assassinClicked,
      this.redWins = data.redWins,
      this.blueWins = data.blueWins,
      this.round = data.round
    })

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
    },
    
  },
  methods: {

    teamAssigner() {
        const randTeam = Math.random() < 0.5
          if (randTeam === true){
          this.teamAssigned1 = "Team 1 - " 
          this.teamAssigned2 = "Team 2 - "
        } else if (randTeam === false){
          this.teamAssigned1 = "Team 2 - " 
          this.teamAssigned2 = "Team 1 - "
        }
    },
    clickCardHelper(){
        this.addVictoryAllCards(this.team)
        this.saveNewMove();
        this.saveNewGameStatus();
        this.wonRound = true;
    },
    clickCard(card) {
      this.addPointsToRightTeam(card);
      
      if (card.colour === "Black") {
        this.clickCardHelper();
        this.team = this.turn;
        this.assassinClicked = true;
        this.wonGame = false;
      } else if (this.redScore === 0 || this.blueScore === 0) {
        this.clickCardHelper();
        this.team = card.colour;
        this.wonGame = true;
      }
      else {
        this.checkIfWrongColour(card);
        this.saveNewMove();
      }
      const index = this.cards.indexOf(card);
      this.cards[index].isClicked = true;
      this.saveNewGameStatus();
      this.updateForAllPlayers();
    },

    updateForAllPlayers(){
        socketIo.emit("game-status", {
        gameOn: this.gameOn,
        cards: this.cards,
        redScore: this.redScore,
        blueScore: this.blueScore,
        turn: this.turn,
        team: this.team,
        wonGame: this.wonGame,
        redWins: this.redWins,
        blueWins: this.blueWins,
        round: this.round,    
        assassinClicked: this.assassinClicked   
      })
    },

    endGame(){
      this.turn = "Red";
      this.team = "";
      this.wonGame = false;
      this.wonRound = false;
      this.gameOn = false;
      this.saveNewMove();
      this.saveNewGameStatus();
      this.updateForAllPlayers();
    },

    checkIfWrongColour(card){
        if (card.colour !== this.turn && !card.isClicked) {
        this.nextTurn()
      };
    },


    addPointsToRightTeam(card){
        if (card.colour === 'Blue' && !card.isClicked) {
        this.blueScore -= 1
        return this.blueScore
        } else if (card.colour === 'Red' && !card.isClicked) {
        this.redScore -= 1
        return this.redScore
        }
    },

    addVictoryAllCards(team){
        if (this.wonRound && this.team === 'Blue') {
          this.blueWins = this.blueWins + 1
        } else if (this.wonRound && this.team === 'Red')
          this.redWins = this.redWins + 1
    },

    addVictoryAssassin(team){
        if (this.assassinClicked && team === "Red"){
            this.blueWins = this.blueWins + 1
        } else if (this.assassinClicked && team === "Blue"){
            this.redWins = this.redWins + 1
        }


    },

    nextTurn(){
      if(this.turn === "Red") {
        this.turn = "Blue"
        this.updateForAllPlayers()
      } else {
        this.turn = "Red"
        this.updateForAllPlayers()
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

    resumeGame(){
      this.gameOn = true
      this.cards = this.gameStatus.cards;
      this.turn = this.gameStatus.turn;
      this.redScore = this.gameStatus.redScore;
      this.blueScore = this.gameStatus.blueScore;
      this.updateForAllPlayers();
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
      this.gameOn = true; 
      this.turn = 'Red';
      this.round = this.round + 1;
      this.redScore = 9;
      this.blueScore = 8;
      this.assassinClicked = false;
      this.updateForAllPlayers();
      
    },

    fetchGameStatus(){
      CodeBreakerService.getGameStatus()
      .then(gameStatuses => {
        this.gameStatus = gameStatuses[0]
      })
    },

    saveNewGameStatus() { 
      const updatedGameStatus = {
        ...this.gameStatus,
        gameOn: this.gameOn,
        cards: this.cards,
        round: this.round,
        redScore: this.redScore,
        blueScore: this.blueScore,
        assassinClicked: this.assassinClicked,
        turn: this.turn
      }
      CodeBreakerService.updateGameStatus(updatedGameStatus);
      this.gameStatus = updatedGameStatus
    },

    saveNewMove() { 
      const updatedGameStatus = {
          ...this.gameStatus,
          cards: this.cards,
          turn: this.turn,
          redScore: this.redScore,
          blueScore: this.blueScore,
          team: this.team,
          wonGame: this.wonGame,
          assassinClicked: this.assassinClicked
      };
      CodeBreakerService.updateGameStatus(updatedGameStatus);
    }
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Rubik:300,300italic,regular,italic,500,500italic,700,700italic,900,900italic);
@import url(https://fonts.googleapis.com/css?family=Bungee:regular);

html {
  background: url('../public/Codenamestable.png') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-attachment: fixed ;
  background-position-y: bottom;
  background-position-x: left;
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
  margin-top: -3%;
  grid-column: 2/5;
}

#app {
  font-family: "Rubik";
  font-weight: 700;
  display: grid;
  font-size: 1.05vw;
  grid-template-columns: 29% 14% 14% 14% 29%;
}

.grid {
  transition: 0.7s;
  box-shadow: -5px 7px 62px 16px rgb(211, 29, 29),
    inset 6px 6px 10px 0 rgba(0, 0, 0, 0.2),
    inset -6px -6px 10px 0 rgba(128, 125, 122, 0.5);
  border: 1rem solid rgb(60, 60, 60);
  background-color: rgb(85, 84, 79);
  grid-column: 2/5;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  border-radius: 5%;
  padding: 0.6vw;
}

.blueTurn {
  transition: 0.7s;
  box-shadow: -5px 7px 62px 16px rgb(32, 76, 221),
    inset 6px 6px 10px 0 rgba(0, 0, 0, 0.2),
    inset -6px -6px 10px 0 rgba(128, 125, 122, 0.5);
}

#toggle-game-button{
  margin-top: -8%;
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
