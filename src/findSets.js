import { LETTERS } from './const';

function isSet(p, q, r) {
  for (let i = 0; i < 4; i++) {
    if ((parseInt(p[i], 10) + parseInt(q[i], 10) + parseInt(r[i], 10)) % 3 !== 0) {
      return false;
    }
  }
  return true;
}

export default function findSets(l) {
  const sets = [];
  const strings = l.map(n => Number(n).toString(3).padStart(4, '0'));
  for (let i = 0; i < l.length; i++) {
    for (let j = i + 1; j < l.length; j++) {
      for (let k = j + 1; k < l.length; k++) {
        if (isSet(strings[i], strings[j], strings[k])) {
          sets.push([i, j, k]);
        }
      }
    }
  }
  return sets;
}
