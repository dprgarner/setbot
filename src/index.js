import express from 'express';
import mime from 'mime-types';
import Canvas from 'canvas';

import drawCards from './drawCards';
import getRandomCards from './getRandomCards';

const app = express();

app.get('/', (req, res) => {
  const { cards, sets } = getRandomCards();
  const canvas = drawCards(cards);
  console.log(sets);

  res.set('Content-Type', mime.lookup('png'));

  const stream = canvas.pngStream();
  stream.on('data', chunk => res.write(chunk));
  stream.on('end', () => {
    res.end();
  });
});

import startGame from './startGame';

app.get('/tweet', (req, res) => {
  startGame()
  .then(() => res.end('done'))
  .catch((err) => {
    console.error(err);
    res.status(500).end(err.message);
  });
});

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Listening on port 3000');
  }
});
