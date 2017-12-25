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
} from './const';

const FILLS = [EMPTY, SOLID, STRIPED];
const COLOURS = [RED, GREEN, BLUE];
const SHAPES = [DIAMOND, OVAL, SQUIGGLE];
const NUMBERS = [1, 2, 3];

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
    colour: COLOURS[parseInt(b3String[0], 10)],
    number: NUMBERS[parseInt(b3String[1], 10)],
    shape: SHAPES[parseInt(b3String[2], 10)],
    fill: FILLS[parseInt(b3String[3], 10)],
  };
}

export function getRandomCards() {
  return getRandomNumbers().map(toCard);
}
