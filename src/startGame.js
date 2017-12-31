import drawCards from './drawCards';
import getRandomCards from './getRandomCards';
import * as twitter from './twitter';

const numberToString = n => [
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
    `There are ${numberToString(sets.length)} sets in this image.` : 
    `There is just one set in this image.`;

  console.log(sets);

  const media_id = await twitter.uploadCanvas(canvas)
  const { id_str } = await twitter.postWithImage(media_id, msg)

  console.log('Set up game: ', id_str);
  return id_str;
}
