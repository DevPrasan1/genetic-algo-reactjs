// const MIN_CHAR_CODE = 65; //32;
// const MAX_CHAR_CDOE = 126; //90; //126;
const possibleChars =`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890,'.-;:_!"#%&/()=?@${[]}`;

// export function randomChar() {
//   return String.fromCharCode(
//     Math.floor(Math.random() * (MAX_CHAR_CDOE - MIN_CHAR_CODE) + MIN_CHAR_CODE)
//   );
// }

export function randomChar() {
  return possibleChars[Math.floor(Math.random() * possibleChars.length)];
}

export function compare(phrase, goal) {
  let out = [];
  for (let i = 0; i < phrase.value.length; i++) {
    let p = { value: phrase.value[i] || "", match: false };
    if (phrase.value[i] === goal[i]) {
      p.match = true;
    }
    out.push(p);
  }
  return { fitness: phrase.fitness, chars: out };
}
