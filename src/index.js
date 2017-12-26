import express from 'express';
import mime from 'mime-types';
import Canvas from 'canvas';

import drawCards from './drawCards';
import getRandomCards from './getRandomCards';

const app = express();

app.get('/', (req, res) => {
  const cards = getRandomCards();
  const canvas = drawCards(cards);

  res.set('Content-Type', mime.lookup('png'));

  const stream = canvas.pngStream();
  stream.on('data', chunk => res.write(chunk));
  stream.on('end', () => {
    res.end();
  });
});

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Listening on port 3000');
  }
});
