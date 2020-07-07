<template>
    <div v-if="gameOn" id="cardsGrid">
        <card id="looped-card" v-for="card, index in cards" :key="index" :card="card"></card>
    </div>
</template>
 
<script>
import Card from './Card'
export default {
    name: 'grid',
    props: ['cards', "gameOn"],
    components: {
        'card': Card
    }
}
</script>

<style>
#looped-card {
    background-color: #C7C2A5;
}
</style>