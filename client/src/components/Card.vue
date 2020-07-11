<template>

<div class="card" v-bind:class="{cardSelected: card.isClicked }" v-on:click="clickCard">
  
  <div v-bind:class="[!card.isHidden || card.isClicked ? card.colour : card]">
    <p>{{card.word}}</p>
  </div>
</div>

</template>

<script>
import {eventBus} from "@/main";

export default {
  name: 'card',
  props: ['card'],

  methods: {
    clickCard: function() {
    eventBus.$emit('card-selected', this.card)
    },

    showCards(){
      this.card.isHidden = !this.card.isHidden
    },
  
    gameStateText() {
      return this.gameOn ? 'End turn' : 'Start game'
    }
  }
  
}
</script>

<style>
.card {
  text-transform: uppercase;
  border: 3px solid rgb(179, 176, 163);
  background: linear-gradient(135deg, rgba(0,0,0,0.22), rgba(255, 255, 255, 0.336));
  text-align: center;
  width: 4.5vw;
  height: 4.5vw;
  margin: 0.6vw;
  margin-left: 0.6vw;
  padding: 0.6vw ;
  border-radius: 15%;
}

p {
  padding-top: 20%;
}

.cardSelected {color: none;
  border: 3px solid rgb(253, 181, 64);
}

.card .Red {
  width: 4.5vw;
  height: 4.5vw;
  transition: 0.1s;
  border-radius: 13%;
  padding: 0.6vw;
  margin-left: -0.6vw;
  margin-top: -0.6vw;
  color: white;
  background: linear-gradient(135deg, rgba(194, 73, 73, 0.836), rgb(177, 8, 8));
}

.card .Blue {
  width: 4.5vw;
  height: 4.5vw;
  color: blue;
  transition: 0.1s;
  border-radius: 13%;
  padding: 0.6vw;
  margin-left: -0.6vw;
  margin-top: -0.6vw;
  color: white;
  background: linear-gradient(135deg, rgba(55, 154, 211, 0.836), rgb(20, 117, 134));
}

.card .Black {
  background: linear-gradient(135deg, rgba(60, 60, 60, 0.836), rgb(0, 0, 0));
  color: white;
  width: 4.5vw;
  height: 4.5vw;
  border-radius: 13%;
  padding: 0.6vw;
  margin-left: -0.6vw;
  margin-top: -0.6vw;
}

.card .hidden {
  color:black;
}
</style>