<template>
<div id="score-wrapper">
  <div id="redwrapper"><h2 id="redcards">red cards</h2></div>
  <div id="bluewrapper"><h2 id="bluecards">blue cards</h2></div>
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
    grid-column: 1/2;
}
#redcards{color:rgba(105, 105, 105, 0);
    height: 50px;
    width: 36px;
    background-color: rgba(139, 0, 0, 0.356);
    text-align: left;
    /* grid-column: 1/2; */
    margin-left: 10%;
    margin-bottom: 10%;
}
#bluewrapper{
    grid-column: 3/4;

}
#bluecards{color: rgba(105, 105, 105, 0);
    height: 50px;
    width: 36px;
    background-color: rgba(0, 191, 255, 0.322);
    text-align: right;
    /* grid-column: 3/4; */
    margin-right: 10%;
    margin-bottom: 10%;

}
</style>