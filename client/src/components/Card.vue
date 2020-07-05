<template>
  <div class="card">
    <div v-bind:id="card.isHidden">
      <div v-bind:id="card.colour">
      <p>{{card.word}}</p>
      </div>
    </div>
    <div v-if="card.isHidden && card.colour === 'Red'" style="background-color: rgb(204, 23, 23);"></div>
  </div>
</template>

<script>
import {eventBus} from '@/main';

export default {
  name: 'card',
  props: ['card'],
  mounted() {
    eventBus.$on('display-colours', this.showCards())
    eventBus.$on('hide-colours', this.showCards())
  },
  methods: {
    showCards(){
      console.log();
      
      this.card.isHidden = !this.card.isHidden
    }
  }
}
</script>

<style>
.card{
  color: rgb(51, 51, 50);
  text-align: center;
  width: 6vw;
  height: 6vw;
  margin: 0.6vw;
  margin-left: 0.6vw;
  padding: 0.9vw;
  border-radius: 15%;

}
p{
  font-size: 0.8vw;
  padding-top: 40%;
}
.card > #true > #Red {
  transition: 0.5s;
  border-radius:50%;
  background-color: rgb(204, 23, 23);
  color: white;

}
.card > #true > #Blue{
  transition: 1s;
  border-radius: 0%;
  background-color: rgb(58, 58, 167);
  color: white;
}
.card > #true > #Black {
  background-color: rgb(44, 43, 43);
  color: white;
}
/* .card {
  background-color: rgb(160, 174, 201);
} */
</style>