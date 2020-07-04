<template>
  <div id="card" v-bind:class="card.colour">
    <p>{{card.word}}</p>
  </div>
</template>

<script>

export default {
name: 'card',
props: ['card']
}
</script>

<style>
#card{
  text-align: center;
  width: 10vw;
  height: 10vw;
  margin: 10px;
  border-radius: 15%;

}
p{
  font-size: 1.2vw;
  padding: 25%;
}
#card.Red:hover{
  border-radius:50%;
  background-color: red;

}
#card.Blue:hover{
  border-radius: 0%;
  background-color: darkblue;
}
#card.Black:hover{
  background-color: black;
  color: white;
}
#card:hover{
  background-color: rgb(160, 174, 201);
}
</style>