import express from 'express';
import mime from 'mime-types';
import Canvas from 'canvas';

import {
  RED,
  GREEN,
  BLUE,
  SOLID,
  EMPTY,
  STRIPED,
  DIAMOND,
  OVAL,
  SQUIGGLE,
  drawCard,
} from './card';

const app = express();

const oneOf = (...opts) => opts[Math.floor(opts.length * Math.random())];

app.get('/', (req, res) => {
  const randomCard = () => drawCard({
    colour: oneOf(RED, GREEN, BLUE),
    number: oneOf(1, 2, 3),
    fill: oneOf(SOLID, EMPTY, STRIPED),
    shape: oneOf(DIAMOND, OVAL, SQUIGGLE),
  });

  const canvas = new Canvas(
    Math.floor((25 + 252 * 4) / 2),
    Math.floor((25 + 360 * 3) / 2)
  );
  const ctx = canvas.getContext('2d');
  ctx.scale(0.5, 0.5);

  for (let i = 0; i < 12; i++) {
    ctx.drawImage(
      randomCard(),
      12 + 252 * (i % 4),
      12 + 360 * Math.floor(i / 4),
      252,
      360,
    );
  }


  res.set('Content-Type', mime.lookup('png'));

  const stream = canvas.pngStream();
  stream.on('data', chunk => res.write(chunk));
  stream.on('end', () => {
    res.end()
  });
});

app.listen(3000, (err) => {
  if (err) return console.error(err);
  console.log('Listening on port 3000');
});
