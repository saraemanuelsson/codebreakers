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

h2 {

}
#score-wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-evenly;
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
    text-size: 3em;
    height: 56px;
    width: 56px;
    background-color: rgba(139, 0, 0, 0.722);
    border-radius: 15%;
    text-align: center;
    /* grid-column: 1/2; */
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
    grid-column: 3/4;
    /* margin-right: 10%; */
    margin-bottom: 10%;
    margin-left: -15%;
    color: white;
}


</style>