import express from 'express';
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
  const canvas = new Canvas(505, 720);
  const context = canvas.getContext('2d');

  drawCard(context, {
    colour: oneOf(RED, GREEN, BLUE),
    number: oneOf(1, 2, 3),
    fill: oneOf(SOLID, EMPTY, STRIPED),
    shape: oneOf(DIAMOND, OVAL, SQUIGGLE),
  });

  res.end(`
    <html>
      <body>
        <img width="50%" src="${ canvas.toDataURL() }" />
      </body>
    </html>
  `);
});

app.listen(3000, (err) => {
  if (err) return console.error(err);
  console.log('Listening on port 3000');
});

// var canvas = document.getElementById("canvas");
// canvas.setAttribute('width', 505);
// canvas.setAttribute('height', 720);
// var context = canvas.getContext("2d");
