<template>
    <div v-if="cards.length != 0" id="cardsGrid">
        <card id="card" v-for="card, index in cards" :key="index" :card="card"></card>
    </div>
</template>
 
<script>
import Card from './Card'
export default {
    name: 'grid',
    props: ['cards'],
    components: {
        'card': Card
    }
}
</script>

<style>
#card {
    background-color: rgb(150, 123, 88);
}
</style>