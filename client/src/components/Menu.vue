<template>

  <nav role="navigation">
      <div id="menuToggle">
          <input type="checkbox"/>
          <span></span>
          <span></span>
          <span></span>
        <ul id="menu">
            <li>Start New Game</li>
            <li>End Current Game</li>
            <li> <br></li>
            <a href="https://czechgames.com/files/rules/codenames-rules-en.pdf" target="_blank"><li>Show Rules</li></a>
            <li><br></li>
            <li>Play with picture cards</li>
        </ul>
     </div>
    </nav>

        
</template>

<script>
import {eventBus} from '@/main'

export default {
name: 'menu',
props: ['gameOn']
}
</script>

<style scoped>
/* #nav{
    position: fixed;
    right: 1;
} */
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
  transform: translate(450%, 0);
  
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
}
#menu li
{
  padding: 10px 0;
  font-size: 1.3vw;
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
    word-break: break-all;
    padding: 5%;
    text-align: right;
    /* background-color: rgba(169, 169, 169, 0.438); */
    margin-left: -70%;
    margin-right: 80%;
}

/* li {
    color: rgba(255, 255, 255, 0.827);
    list-style: none;
/* } */
a {
    text-decoration: none;
}
</style>