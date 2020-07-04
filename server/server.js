const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_routers.js');

app.use(bodyParser.json());
app.use(cors());

MongoClient.connect('mongodb://localhost:27017')
  .then((player) => {
    const db = player.db('codebreaker');
    const prePlayCardsCollection = db.collection('prePlayCards');
    const wordsCollection = db.collection('words');
    const remainingCardsCollection = db.collection('remainingCards');

    const prePlayCardsRouter = createRouter(prePlayCardsCollection);
    app.use('/api/preplaycards', prePlayCardsRouter);

    const wordsRouter = createRouter(wordsCollection);
    app.use('/api/words', wordsRouter);

    const remainingCardsRouter = createRouter(remainingCardsCollection);
    app.use('/api/remainingcards', remainingCardsRouter);
  })
  .catch(console.err);

  app.listen(3000, function() {
    console.log(`Listening on port ${this.address().port}`);
  });