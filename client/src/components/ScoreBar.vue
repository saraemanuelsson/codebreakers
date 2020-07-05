<template>
  <div id="score-bar">
      <score-card></score-card>

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
color:none;
}
</style>