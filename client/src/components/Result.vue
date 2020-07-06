<template>
    <div v-if="team.length != 0" class="modal" v-bind:class="team">
        <h1 v-if="wonGame">Congratulations! Good job {{team}} team!</h1>
        <h1 v-else-if="!wonGame">Oh no! Better luck next time {{team}} team!</h1>
    </div>
</template>

<script>
export default {
    name: "display-result",
    props: ["team", "wonGame"]
}
</script>

<style>
.modal {

  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  color: white;
  text-align: center;
  vertical-align: middle;
}

.Red {
    background-color: rgba(220, 20, 60, 0.427);
}
.Blue {
    background-color: rgba(0, 0, 255, 0.345);
}
</style>