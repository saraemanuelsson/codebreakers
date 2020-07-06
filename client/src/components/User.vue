<template>
    <div v-if="gameOn" id="spy-guess-buttons">
        <button v-on:click="displayColours">Codebreaker</button>
        <button v-on:click="hideColours">Guesser</button>
    </div>
  <!-- <button v-on:mousedown="displayColours" v-on:mouseup="hideColours">SpyMaster</button> -->

</template>

<script>
import {eventBus} from '@/main'

export default  {
    name: "user",
    props: ['cards', 'gameOn'],
    methods: {
        displayColours() {
            console.log(this.cards)
            const unHiddenCards = this.cards.map((card) => card.isHidden = false)
            eventBus.$emit("display-to-app", this.cards)
        },
        
        hideColours() {
            console.log(this.cards)
            const hiddenCards = this.cards.map((card) => card.isHidden = true)
            eventBus.$emit("hide-to-app", this.cards)
            console.log(this.cards)
            
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