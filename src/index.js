import express from 'express';
import mime from 'mime-types';
import Canvas from 'canvas';

import startGame from './startGame';
import drawCards from './drawCards';
import getRandomCards from './getRandomCards';

import { createStream } from './twitter';

const app = express();
const tweetStream = createStream();

app.get('/favicon.ico', (req, res) => {
  console.log('favicon requested');
  res.end();
});

app.get('/img', (req, res) => {
  // Test-generate an image
  const { cards, sets } = getRandomCards();
  const canvas = drawCards(cards);
  console.log(sets);

  res.set('Content-Type', mime.lookup('png'));

  const pngStream = canvas.pngStream();
  pngStream.on('data', chunk => res.write(chunk));
  pngStream.on('end', () => {
    res.end();
  });
});

app.get('/tweet', (req, res) => {
  startGame()
  .then((id_str) => {
    // TODO probably should use RxJS for this, to isolate reconnection logic etc. if need be
    // Listen to the user's stream
    tweetStream.on('tweet', (tweet) => {
      // This thread?
      if (tweet.in_reply_to_status_id_str !== id_str) return;
      // id_str
      // in_reply_to_status_id_str
      // user.id_str
      console.log(tweet);
    });

    res.end('done');
  })
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

console.log('set up stream');
