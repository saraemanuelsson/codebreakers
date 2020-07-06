<template>
<div id="score-wrapper">
  <div id="redwrapper">
      <div id="redcards"><h2>{{redScore}}</h2></div>
  </div>
  <div id="bluewrapper">
      <div id="bluecards"><h2>{{blueScore}}</h2></div>
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
    align-items: center;
    margin-bottom: 5%;
}

#redwrapper{
    display: flex;
    flex-direction: row;
    grid-column: 1/2;
}
#redcards{
    box-shadow: -16px -1px 16px -4px rgba(0,0,0,0.75);
    color:white;
    height: 56px;
    width: 56px;
    background-color: rgba(139, 0, 0, 0.722);
    border-radius: 15%;
    text-align: center;
}
#bluewrapper{
    display: flex;
    flex-direction: row-reverse;
    grid-column: 3/4;

}
#bluecards{color: rgba(105, 105, 105, 0);
    height: 56px;
    width: 56px;
    box-shadow: -16px -1px 16px -4px rgba(0,0,0,0.75);
    border-radius: 15%;
    background-color: rgba(10, 136, 177, 0.838);
    text-align: center;
    color: white;
}


</style>