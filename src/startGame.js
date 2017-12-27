import Twit from 'twit';

import drawCards from './drawCards';
import getRandomCards from './getRandomCards';

const twitterClient = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

function uploadCanvas(canvas) {
  return new Promise((resolve, reject) => {
    const b64content = canvas.toBuffer().toString('base64');
    twitterClient.post(
      'media/upload', { media_data: b64content }, (err, { media_id_string }) => {
        if (err) {
          reject(err);
        } else {
          resolve(media_id_string);
        }
      }
    );
  });
}

function postWithImage(media_id, status) {
  return new Promise((resolve, reject) => {
    twitterClient.post(
      'statuses/update',
      { media_ids: [media_id], status },
      (err, data, response) => {
        if (err) {
          reject(err);
        } else {
          console.log('Tweeted: ', data.text);
          resolve(data)
        }
      }
    );
  })
}

function tweetImage(canvas, msg) {
  return uploadCanvas(canvas)
    .then(media_id => postWithImage(media_id, msg));
}

const numberStrings = n => [
  null,
  null,
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
][n] || n;

export default async function startGame() {
  const { cards, sets } = getRandomCards();
  const canvas = drawCards(cards);

  const msg = sets.length > 1 ? 
    `There are ${numberStrings(sets.length)} sets in this image.` : 
    `There is just one set in this image.`;

  console.log(sets);

  // Listen to the user
  const stream = twitterClient.stream('statuses/filter', {
    follow: process.env.TWITTER_USER_ID,
  });

  stream.on('tweet', (tweet) => {
    console.log(tweet);
  });
  console.log('set up stream');
  return true;

  const { id_str } = await tweetImage(canvas, msg)

  console.log('Set up game: ', id_str);
  return id_str;
}
