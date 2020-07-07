<template>
    <div v-if="team.length != 0" class="modal" v-bind:class="team">
        <img v-if="!wonGame" src="../../public/assassin.png"/>
        <h1 v-if="wonGame">Congratulations! Good job {{team}} team!</h1>
        <h1 v-else-if="!wonGame">Oh no! Better luck next time {{team}} team!</h1>
        <button id="new-game" v-on:click="gameCompleted">New Game</button>
    </div>
</template>

<script>
import App from "../App"

export default {
    name: "display-result",
    props: ["team", "wonGame"],
    methods: {
        gameCompleted(){
            this.$parent.endGame()
            this.$parent.startGame()
        }
    }
}
</script>

<style>
img{
    width: 18vw;
    position: fixed;
    margin-top: 2vw;
    margin-left: -9vw;
    z-index: -1;
}
.modal {

  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  color: rgb(0, 0, 0);
  text-align: center;
  vertical-align: middle;
}
h1{
    padding: 1vw;
    background-color: rgba(240, 248, 255, 0.712);
    margin-top: 23vw;
}

.Red {
    background-color: rgba(220, 20, 60, 0.427);
}
.Blue {
    background-color: rgba(0, 0, 255, 0.345);
}
#new-game{
    margin-top: 4vw;
    font-family: "Bungee";
    width: 20vw;
    height:4.2vw;
    font-size: 1.5vw;
    border-style: none;
    border-radius: 12px;
    background-color: rgb(39, 38, 41);
    outline: none;
    padding-top: 0.2rem;
    cursor: pointer;
    color: rgb(159, 132, 204);
}
#new-game:hover{
    transform: scale(1.1);
    background-color: black;
    color: rgb(136, 100, 196);

}
</style>