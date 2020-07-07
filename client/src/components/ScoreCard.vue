<template>
<div id="score-wrapper">
  <div id="redwrapper">
      <div v-if="redScore > 1" class="redcards"></div>
      <div v-if="redScore > 2" class="redcards"></div>
      <div v-if="redScore > 3" class="redcards"></div>
      <div v-if="redScore > 4" class="redcards"></div>
      <div v-if="redScore > 5" class="redcards"></div>
      <div v-if="redScore > 6" class="redcards"></div>
      <div v-if="redScore > 7" class="redcards"></div>
      <div v-if="redScore > 8" class="redcards"></div>
      <div id="redScoreCard" class="redcards">{{redScore}}</div>
  </div>
  <div id="bluewrapper">
      <div v-if="blueScore > 1" class="bluecards"></div>
      <div v-if="blueScore > 2" class="bluecards"></div>
      <div v-if="blueScore > 3" class="bluecards"></div>
      <div v-if="blueScore > 4" class="bluecards"></div>
      <div v-if="blueScore > 5" class="bluecards"></div>
      <div v-if="blueScore > 6" class="bluecards"></div>
      <div v-if="blueScore > 7" class="bluecards"></div>
      <div id="blueScoreCard" class="bluecards">{{blueScore}}</div>
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
    margin-left: 3em;
}

.redcards{
    color: white;
    border: 2px solid rgb(177, 8, 8);
    background: linear-gradient(135deg, rgb(194, 73, 73), rgb(177, 8, 8));
    height: 4vw;
    width: 4vw;
    border-radius: 15%;
    text-align: center;
    padding: 0 important;
    font-size: 3em;
    line-height: 1.3em;
    margin-left: -1em;
}

#bluewrapper{
    display: flex;
    flex-direction: row-reverse;
    grid-column: 3/4;
    margin-right: 3em;
}

.bluecards{
    color: rgb(105, 105, 105);
    border: 2px solid rgb(22, 94, 107);
    height: 4vw;
    width: 4vw;
    background: linear-gradient(135deg, rgb(55, 154, 211), rgb(20, 117, 134));
    border-radius: 15%;
    text-align: center;
    color: white;
    padding: 0 !important;
    font-size: 3em;
    line-height: 1.3em;
    margin-right: -1em;
}
</style>