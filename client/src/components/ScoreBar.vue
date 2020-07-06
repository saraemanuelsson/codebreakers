<template>
  <div  id="score-bar">
      <score-card v-if="gameOn" :redScore="redScore" :blueScore="blueScore"> </score-card>
  </div>
</template>

<script>
import ScoreCard from './ScoreCard'

export default {
name: 'scoreBar',
props: ['redScore', 'blueScore', 'gameOn'],
components: {
    'score-card': ScoreCard
}}
</script>

<style>
#score-bar{
    justify-content: space-evenly;
}
</style>