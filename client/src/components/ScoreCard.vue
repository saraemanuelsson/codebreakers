<template>
<div id="score-wrapper">
  <div id="redwrapper">
      <h2 id="redcards">{{redScore}}</h2>
  </div>
  <div id="bluewrapper">
      <h2 id="bluecards">{{blueScore}}</h2>
  </div>
</div>
</template>

<script>
import ScoreBar from "./ScoreBar.vue"

export default {
    name: 'scoreCard', 
    props: ['scoreCard', 'blueScore', 'redScore'],
    components: {
        'score-bar': ScoreBar
    },
    methods: {
        toggleGameState(){
                this.$parent.toggleGameState()

        }
    }
    

}
</script>

<style scoped> 

#score-wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-evenly;
    margin-bottom: 2vw;
}

#redwrapper{
    display: flex;
    flex-direction: row;
    grid-column: 1/2;
}

#redcards{
    box-shadow: -16px -1px 16px -4px rgba(0,0,0,0.75);
    color:white;
    height: 4vw;
    width: 4vw;
    line-height: 4vh;
    background-color: rgb(139, 0, 0);
    border-radius: 15%;
    text-align: center;
    margin: 0 !important;
    padding: 0 !important;
}
#bluewrapper{
    display: flex;
    flex-direction: row-reverse;
    grid-column: 3/4;
}

#bluecards{
    color: rgb(105, 105, 105);
    height: 4vw;
    width: 4vw;
    box-shadow: -16px -1px 16px -4px rgba(0,0,0,0.75);
    border-radius: 15%;
    background-color: rgba(10, 136, 177);
    text-align: center;
    color: white;
    margin: 0 !important;
    padding: 0 !important;

}
</style>