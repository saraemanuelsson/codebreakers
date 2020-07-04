const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_routers.js');

app.use(bodyParser.json());

MongoClient.connect('mongodb://localhost:27017')
  .then((player) => {
    const db = player.db('codebreaker');
    const prePlayCardsCollection = db.collection('prePlayCards');
    const wordsCollection = db.collection('words');

    const prePlayCardsRouter = createRouter(prePlayCardsCollection);
    app.use('/api/preplaycards', prePlayCardsRouter);

    const wordsRouter = createRouter(wordsCollection);
    app.use('/api/words', wordsRouter);
  })
  .catch(console.err);

  app.listen(3000, function() {
    console.log(`Listening on port ${this.address().port}`);
  });