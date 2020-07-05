<template>
<div id="score-wrapper">
  <div id="redwrapper"><h2 id="redcards"></h2>
  <h2 id="redcards"></h2>
  <h2 id="redcards"></h2>
  <h2 id="redcards"></h2>
  <h2 id="redcards"></h2>
  <h2 id="redcards"></h2>
  <h2 id="redcards"></h2>
  <h2 id="redcards"></h2></div>
  <div id="bluewrapper"><h2 id="bluecards">blue cards</h2>
  <h2 id="bluecards">blue cards</h2>
  <h2 id="bluecards">blue cards</h2>
  <h2 id="bluecards">blue cards</h2>
  <h2 id="bluecards">blue cards</h2>
  <h2 id="bluecards">blue cards</h2>
  <h2 id="bluecards">blue cards</h2>
  <h2 id="bluecards">blue cards</h2>
  </div>
  </div>
</template>

<script>
export default {
    name: 'scoreCard',
    props: ['scoreCard']

}
</script>

<style>
#score-wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-evenly;
}
#redwrapper{
    margin-left: 20%;
    display: flex;
flex-direction: row;
    grid-column: 1/2;
}
#redcards{
    box-shadow: -16px -1px 16px -4px rgba(0,0,0,0.75);

    color:rgba(105, 105, 105, 0.728);
    height: 50px;
    width: 36px;
    background-color: rgba(139, 0, 0, 0.722);
    text-align: left;
    /* grid-column: 1/2; */
    margin-left: -10%;
    margin-bottom: 10%;
}
#bluewrapper{margin-left: 50%;
   display: flex;
flex-direction: row;
    grid-column: 3/4;

}
#bluecards{color: rgba(105, 105, 105, 0);
    height: 50px;
    width: 36px;
    box-shadow: -16px -1px 16px -4px rgba(0,0,0,0.75);
    background-color: rgba(10, 136, 177, 0.838);
    text-align: right;
    /* grid-column: 3/4; */
    /* margin-right: 10%; */
    margin-bottom: 10%;
    margin-left: -15%;

}
</style>