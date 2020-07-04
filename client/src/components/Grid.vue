<template>
    <div id="cardsGrid">
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
#cardsGrid{
    display: flex;
    flex-direction: row;
}
#card {vertical-align: center;
    /* display: flexbox;
    flex-direction: row; */
    /* grid-template-columns: 20% 20% 20% 20% 20%;
    grid-template-rows: 20% 20% 20% 20% 20%; */
    background-color: rgb(180, 150, 111);
}
</style>