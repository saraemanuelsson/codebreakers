<template>
  <div id="score-bar">
      <h2>{{redScore}}</h2>
      <h2>{{blueScore}}</h2>
      <score-card>

          
      </score-card>

    </div>
</template>

<script>
import ScoreCard from './ScoreCard'
export default {
name: 'scoreBar',
props: ['redScore', 'blueScore'],
components: {
    'score-card': ScoreCard
}}
</script>

<style>
#score-bar{
    justify-content: space-evenly;
/* color:white; */
}
</style>