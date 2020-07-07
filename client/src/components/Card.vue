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
.card{
  border: 4px solid transparent;
  /* color: rgb(51, 51, 50); */
  text-align: center;
  width: 5vw;
  height: 5vw;
  margin: 0.6vw;
  margin-left: 0.59vw;
  padding: 0.9vw;
  border-radius: 15%;
  /* background: linear-gradient(135deg, rgba(0,0,0,0.22), rgba(255, 255, 255, 0.336)); */
  /* border: -4px solid rgb(red, rgba(0, 128, 0, 0), blue); */

}

p{
  /* font-size: 0.8vw; */
  padding-top: 20%;
}
.cardSelected {
  border: 4px solid rgb(253, 181, 64);

}
.card .Red{
  /* border: 10px solid rgb(253, 64, 64);
  box-sizing: border-box; */
  width: 5vw;
  height: 5vw;
  /* color:crimson; */
  /* transition: 1s; */
  border-radius: 15%;
  padding: 0.9vw;
  /* background-color: rgb(204, 23, 23); */
  margin-left: -0.9vw;
  margin-top: -0.9vw;
  color: white;
  background: linear-gradient(135deg, rgba(194, 73, 73, 0.836), rgb(177, 8, 8));
}
.card .Blue{
  width: 5vw;
  height: 5vw;
  color: blue;
  /* transition: 1s; */
  border-radius: 15%;
  padding:0.9vw;
  margin-left: -0.9vw;
  margin-top: -0.9vw;
  color: white;
  background: linear-gradient(135deg, rgba(55, 154, 211, 0.836), rgb(20, 117, 134));

  
}
.card .Black{
  background-color: #3C3C3C;
  /* background: linear-gradient(135deg, rgba(194, 73, 73, 0.836), rgb(177, 8, 8)); */
  color: white;
  width: 5vw;
  height: 5vw;
  border-radius: 15%;
  padding:0.9vw;
  margin-left: -0.9vw;
  margin-top: -0.9vw;
}
.card .hidden {
  color:black;
}

</style>