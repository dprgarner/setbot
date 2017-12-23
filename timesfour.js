const fs = require('fs');

const input = fs.readFileSync('qqq.txt', 'utf8');

const output = /\d+(\.\d+)?/g[Symbol.replace](input, (x) => {
  return (4 * Math.round(parseInt(x, 10)))
})

console.log(output);
fs.writeFileSync('qqq2.txt', output)
