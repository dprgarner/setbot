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
  const canvas = drawCard({
    colour: oneOf(RED, GREEN, BLUE),
    number: oneOf(1, 2, 3),
    fill: oneOf(SOLID, EMPTY, STRIPED),
    shape: oneOf(DIAMOND, OVAL, SQUIGGLE),
  });

  res.set('Content-Type', mime.lookup('png'));

  const stream = canvas.pngStream();
  stream.on('data', chunk => res.write(chunk));
  stream.on('end', () => res.end());
});

app.listen(3000, (err) => {
  if (err) return console.error(err);
  console.log('Listening on port 3000');
});
