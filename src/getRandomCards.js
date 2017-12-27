import { LETTERS } from './const';
import findSets from './findSets';

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
  return { cards, sets };
}
