import {
  EMPTY,
  SOLID,
  STRIPED,
  RED,
  GREEN,
  BLUE,
  DIAMOND,
  OVAL,
  SQUIGGLE,
  LETTERS,
} from './const';
import findSets from './findSets';

const NUMBERS = [1, 2, 3];
const COLOURS = [RED, GREEN, BLUE];
const SHAPES = [DIAMOND, OVAL, SQUIGGLE];
const FILLS = [EMPTY, SOLID, STRIPED];

function getRandomNumbers() {
  const numbers = {};
  while (Object.keys(numbers).length < 12) {
    const n = Math.floor(Math.random() * 81);
    numbers[n] = true;
  }
  const ordered = Object.keys(numbers);
  const shuffled = [];
  while (ordered.length) {
    const n = Math.floor(Math.random() * ordered.length);
    shuffled.unshift(...ordered.splice(n, 1));
  }
  return shuffled;
}

function toCard(n) {
  const b3String = Number(n).toString(3).padStart(4, '0');
  return {
    number: NUMBERS[parseInt(b3String[0], 10)],
    colour: COLOURS[parseInt(b3String[1], 10)],
    shape: SHAPES[parseInt(b3String[2], 10)],
    fill: FILLS[parseInt(b3String[3], 10)],
  };
}

// let set = [LETTERS[i], LETTERS[j], LETTERS[k]];
// // Number should be increasing; letter order otherwise.
// if (strings[i][0] > strings[j][0] || strings[j][0] > strings[k][0]) {
//   set = [i, j, k].sort((a, b) => (
//     strings[a][0] < strings[b][0] ? -1 : 1
//   )).map(x => LETTERS[x]);
// }

export default function getRandomCards() {
  let cards, sets = [];
  while (sets.length < 1) {
    cards = getRandomNumbers();
    sets = findSets(cards);
  }
  console.log(sets);
  return cards.map(toCard);
}
