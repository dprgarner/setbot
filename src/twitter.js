import Twit from 'twit';

const twitterClient = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

export function uploadCanvas(canvas) {
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

export function postWithImage(media_id, status) {
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

export function createStream() {
  return twitterClient.stream('statuses/filter', {
    follow: process.env.TWITTER_USER_ID,
  });
}
