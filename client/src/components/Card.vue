<template>
  <div id="card">
    <p>{{card.word}}<br>{{card.colour}}</p>
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