<template>
    <div v-if="gameOn" id="spy-guess-button-wrapper">
    <!-- <div id="spy-guess-buttons"> -->

        <button id="spy-guess-button" v-on:mousedown="displayColours" v-on:mouseup="hideColours">Codebreaker</button>
    </div>

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
#spy-guess-button{
    position: relative;
    top: 150%;

}
</style>