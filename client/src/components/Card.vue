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
  color: rgb(51, 50, 50);
  text-align: center;
  width: 6vw;
  height: 6vw;
  margin: 0.6vw;
  margin-left: 0.6vw;
  padding: 0.9vw;
  border-radius: 15%;

}
p{
  font-size: 0.8vw;
  padding-top: 40%;
}
#card.Red:hover{
  transition: 0.5s;
  border-radius:50%;
  background-color: rgb(204, 23, 23);
  color: white;

}
#card.Blue:hover{
  transition: 1s;
  border-radius: 0%;
  background-color: rgb(58, 58, 167);
  color: white;
}
#card.Black:hover{
  background-color: rgb(44, 43, 43);
  color: white;
}
#card:hover{
  background-color: rgb(160, 174, 201);
}
</style>