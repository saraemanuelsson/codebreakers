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
  /* color: rgb(51, 51, 50); */
  text-align: center;
  width: 5vw;
  height: 5vw;
  margin: 0.6vw;
  margin-left: 0.59vw;
  padding: 0.9vw;
  border-radius: 15%;
  background: linear-gradient(135deg, rgba(0,0,0,0.22), rgba(255, 255, 255, 0.336));
}

p{
  /* font-size: 0.8vw; */
  padding-top: 40%;
}
.cardSelected {
  border: 2px solid rgb(253, 181, 64);
}
.card .Red{
  color:crimson;
  transition: 0.5s;
  border-radius:50%;
  background-color: rgb(204, 23, 23);
  color: white;
}
.card .Blue{
  color: blue;
  transition: 1s;
  border-radius: 0%;
  background-color: rgb(58, 58, 167);
  color: white;
}
.card .Black{
  background-color: rgb(44, 43, 43);
  color: white;
}
.card .hidden {
  color:black;
}
/* .card > #true.Red {
  transition: 0.5s;
  border-radius:50%;
  background-color: rgb(204, 23, 23);
  color: white;

}
.card > #true.Blue{
  transition: 1s;
  border-radius: 0%;
  background-color: rgb(58, 58, 167);
  color: white;
}
.card > #true.Black {
  background-color: rgb(44, 43, 43);
  color: white;
}*/
/* .card {
  background-color: rgb(160, 174, 201);
}  */
</style>