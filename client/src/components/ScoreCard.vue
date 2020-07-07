<template>
<div id="score-wrapper">
  <div id="redwrapper">
      <h2 v-if="redScore > 1" class="redcards"></h2>
      <h2 v-if="redScore > 2" class="redcards"></h2>
      <h2 v-if="redScore > 3" class="redcards"></h2>
      <h2 v-if="redScore > 4" class="redcards"></h2>
      <h2 v-if="redScore > 5" class="redcards"></h2>
      <h2 v-if="redScore > 6" class="redcards"></h2>
      <h2 v-if="redScore > 7" class="redcards"></h2>
      <h2 v-if="redScore > 8" class="redcards"></h2>
      <h2 id="redScoreCard" class="redcards">{{redScore}}</h2>
  </div>
  <div id="bluewrapper">
      <h2 v-if="blueScore > 1" class="bluecards"></h2>
      <h2 v-if="blueScore > 2" class="bluecards"></h2>
      <h2 v-if="blueScore > 3" class="bluecards"></h2>
      <h2 v-if="blueScore > 4" class="bluecards"></h2>
      <h2 v-if="blueScore > 5" class="bluecards"></h2>
      <h2 v-if="blueScore > 6" class="bluecards"></h2>
      <h2 v-if="blueScore > 7" class="bluecards"></h2>
      <h2 id="blueScoreCard" class="bluecards">{{blueScore}}</h2>
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


.redcards{
    display: flex;
    box-shadow: -16px -1px 16px -4px rgba(0,0,0,0.75);
    color:white;
    height: 4vw;
    width: 4vw;
    line-height: 4vh;
    background-color: rgb(139, 0, 0);
    border-radius: 15%;
    text-align: center;
    margin: -20px !important;
    padding: 0 !important;
}

h2 > #redScoreCard{
    color: ;
    text-align: center;
    padding: 10px;
}

#bluewrapper{
    display: flex;
    flex-direction: row-reverse;
    grid-column: 3/4;
}

.bluecards{
    color: rgb(105, 105, 105);
    height: 4vw;
    width: 4vw;
    box-shadow: -16px -1px 16px -4px rgba(0,0,0,0.75);
    border-radius: 15%;
    background-color: rgba(10, 136, 177, 0.838);
    text-align: center;
    color: white;
    margin: -20px !important;
    padding: 0 !important;

}

h2 {
    margin: 0 !important;
    padding: 0 !important;
    vertical-align: middle;
}
</style>