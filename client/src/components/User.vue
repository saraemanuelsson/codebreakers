<template>
  <button v-on:click="displayColours" v-on:mouseup="hideColours">SpyMaster</button>
</template>

<script>
import {eventBus} from '@/main'
export default {
    name: "user",
    props: ['cards'],
    methods: {
        displayColours() {
            eventBus.$emit('display-colours', false)
        },
        hideColours() {
            eventBus.$emit('hide-colours', true)
            
        }
    }
}
</script>

<style>

</style>