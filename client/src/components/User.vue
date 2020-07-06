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
    font-family: "Bungee";
    margin-left: -23%;
    width: 15vw;
    height:3vw;
    font-size: 1.5vw;
    border-style: none;
    border-radius: 12px;
    background-color: rgba(240, 248, 255, 0.438);
    outline: none;

}
#spy-guess-button:hover{
    background-color: rgba(58, 54, 54, 0.767);
    color: rgba(255, 248, 220, 0.733);

}
</style>