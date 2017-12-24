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
  letters,
} from './const';

const oneOf = (...opts) => opts[Math.floor(opts.length * Math.random())];

const randomCard = () => ({
  colour: oneOf(RED, GREEN, BLUE),
  number: oneOf(1, 2, 3),
  fill: oneOf(SOLID, EMPTY, STRIPED),
  shape: oneOf(DIAMOND, OVAL, SQUIGGLE),
  faded: oneOf(true, false),
});

export function getRandomCards() {
  const cards = [];
  for (let i = 0; i < 12; i++) {
    cards.push(randomCard());
  }

  return cards;
}
