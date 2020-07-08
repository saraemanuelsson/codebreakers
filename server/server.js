const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require("http").Server(app);
const io = require('socket.io')(http);

io.on('connect', socket => {
  console.log("connect");
  socket.on("disconnect", () => {
    console.log("disconnect");
  })
  socket.join("codebreakers", () => {
    console.log(socket.rooms);
  })

  socket.emit("test", "hey");
  socket.on("game-status", function(data){    
    socket.broadcast.emit("updated-game", data)
  })

});

const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_routers.js');

app.use(bodyParser.json());
app.use(cors({credentials: true, origin: "*"}));

MongoClient.connect('mongodb://localhost:27017')
  .then((player) => {
    const db = player.db('codebreaker');
    const prePlayCardsCollection = db.collection('prePlayCards');
    const wordsCollection = db.collection('words');
    const gameStatusCollection = db.collection('gameStatus');
    
    const prePlayCardsRouter = createRouter(prePlayCardsCollection);
    app.use('/api/preplaycards', prePlayCardsRouter);

    const wordsRouter = createRouter(wordsCollection);
    app.use('/api/words', wordsRouter);

    const gameStatusRouter = createRouter(gameStatusCollection);
    app.use('/api/gamestatus', gameStatusRouter);
  })
  .catch(console.err);

  http.listen(3000, function() {
    console.log(`Listening on port ${this.address().port}`);
  });