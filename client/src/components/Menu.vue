<template>

  <nav role="navigation">
      <div id="menuToggle">
          <input type="checkbox"/>
          <span></span>
          <span></span>
          <span></span>
        <ul id="menu">
            <li @click="startGame">Start New Game</li>
            <li @click="endGame">End Current Game</li>
            <li v-if="!gameOn" @click="resumeGame">Resume Game</li>
            <a href="https://czechgames.com/files/rules/codenames-rules-en.pdf" target="_blank"><li>Show Rules</li></a>
            <li class='round'>ROUND  {{round}}</li>
            <li class='red-wins'>RED  {{redWins}}</li>   
            <li class='blue-wins'>BLUE  {{blueWins}}</li>
        </ul>
     </div>
  </nav>
        
</template>

<script>
import {eventBus} from '@/main'
import App from '../App'

export default {
name: 'menu-button',
props: ['gameOn', 'redWins', 'blueWins', 'round'],
methods: {
  startGame(){
    this.$parent.startGame()
  },
  endGame(){
    this.$parent.endGame();
  },
  resumeGame(){
    this.$parent.resumeGame();
  }
}
}
</script>

<style scoped>
#menuToggle
{
    display: block;
    position: relative;
    top: 50px;
    left: 50px;
  
  z-index: 1;
}
#menuToggle input {
    display: block;
  width: 40px;
  height: 32px;
  position: absolute;
  top: -7px;
  left: -5px;
  
  cursor: pointer;
  
  opacity: 0;
  z-index: 2;
}
#menuToggle span
{
  display: block;
  width: 33px;
  height: 4px;
  margin-bottom: 5px;
  position: relative;
  
  background: #cdcdcd;
  border-radius: 3px;
  
  z-index: 1;
  
  transform-origin: 4px 0px;
  
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              opacity 0.55s ease;
}
#menuToggle span:first-child
{
  transform-origin: 0% 0%;
}

#menuToggle span:nth-last-child(2)
{
  transform-origin: 0% 100%;
}
#menuToggle input:checked ~ span
{
  opacity: 1;
  transform: rotate(45deg) translate(-2px, -1px);
  background: #232323;
}
#menuToggle input:checked ~ span:nth-last-child(3)
{
  opacity: 0;
  transform: rotate(0deg) scale(0.2, 0.2);
}
#menuToggle input:checked ~ span:nth-last-child(2)
{
  transform: rotate(-45deg) translate(0, -1px);
}
#menu
{position: fixed;
  width: 300px;
  margin: -100px 0 0 -50px;
  padding: 50px;
  padding-top: 125px; 
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  transform-origin: 0% 0%;
  transform: translate(90vw, -2vw);
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
}
#menu li{
  word-break: keep-all;
  text-align: right;
  padding: 0.2vw 0.8vw;
  margin-left: -13.5vw;
  font-size: 1.5vw;
}
#menu li:hover{
    color: rgba(255, 136, 0, 0.753);
}
#menuToggle input:checked ~ ul
{
  transform: none;
}
nav{
    margin-left: 100%;
    position: fixed;
    right: 2
}
li {
  font-family: "Bungee";
    cursor: pointer;
    word-break: break-all;
    text-align: right;
    background-color: rgba(169, 169, 169, 0.438);
    margin-left: -70%;
    margin-right: 80%;
    margin-bottom: 5%;
}
a:link, a:visited {
    color: rgb(0, 0, 0);
}
a {
    text-decoration: none;
}

.round {
  background: linear-gradient(135deg, rgba(60, 60, 60, 0.836), rgb(0, 0, 0));
  border: 2px solid rgb(60, 60, 60);
  color: white;
  text-align: left;
}

.red-wins {
  background: linear-gradient(135deg, rgb(194, 73, 73), rgb(177, 8, 8));
  border: 2px solid rgb(177, 8, 8);
  color: white;
}

.blue-wins {
  background: linear-gradient(135deg, rgba(55, 154, 211, 0.836), rgb(20, 117, 134));
  border: 2px solid rgb(22, 94, 107);
  color: white;
}
</style>