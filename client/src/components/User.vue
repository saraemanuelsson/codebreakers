<template>
  <button v-on:click="displayColours">SpyMaster</button>
  <!-- <button v-on:mousedown="displayColours" v-on:mouseclick="hideColours">SpyMaster</button> -->

</template>

<script>
import {eventBus} from '@/main'
export default {
    name: "user",
    props: ['cards'],
    methods: {
        displayColours() {
            console.log(this.cards)
            const unHiddenCards = this.cards.map((card) => card.isHidden = false)
            eventBus.$emit("display-to-app", unHiddenCards)
        },
        hideColours() {
            console.log(this.cards)
            const hiddenCards = this.cards.map((card) => card.isHidden = true)
            eventBus.$emit("display-to-app", hiddenCards)
        }
    }
    // methods: {
    //     displayColours() {
    //         eventBus.$emit('display-colours', false)
    //     },
    //     hideColours() {
    //         eventBus.$emit('hide-colours', true)
            
        // }
    
}
</script>

<style>

</style>