<template>
    <div id="cardsGrid">
        <card v-for="card, index in cards" :key="index" :card="card"></card>
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
#cardsGrid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
</style>