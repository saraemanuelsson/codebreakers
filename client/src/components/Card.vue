<template>
<div id="card">
  <h4>{{card.word}}</h4>
  <h4>{{card.colour}}</h4>
  </div>
</template>

<script>

export default {
name: 'card',
props: ['card']
}
</script>

<style>

</style>