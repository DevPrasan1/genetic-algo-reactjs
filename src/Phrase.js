import { randomChar } from "./helper";


export default class Phrase {
  constructor(initialValue) {
    this.value = initialValue || "";
    this.fitness = 0;
  }

  create = size => {
    while (size--) {
      this.value += randomChar();
    }
  };

  calFitness = compareTo => {
    this.fitness =
      10 *
        [...this.value].reduce(
          (totalFitness, currChar, index) =>
            totalFitness + (currChar === compareTo[index] ? 1 : 0),
          0
        ) +
      1;
  };

  mutate = fraction => {
    if (Math.random() > 0.45) {
      return;
    }
    const size = this.value.length;
    let numOfCharToChange = Math.floor(fraction * size) || 1;
    let randomPositions = [];
    while (numOfCharToChange--) {
      randomPositions.push(Math.floor(Math.random() * size));
    }
    let newValue = "";
    for (let i = 0; i < size; i++) {
      if (randomPositions.includes(i)) {
        newValue += randomChar();
      } else {
        newValue += this.value[i];
      }
    }
    this.value = newValue;
  };

  crossOver = phrase => {
    let newValue = "";
    const crossPoint = Math.floor(Math.random()*phrase.length);
    for (let i = 0; i < this.value.length; i++) {
      if (i > crossPoint) {
        newValue += phrase.value[i];
      } else {
        newValue += this.value[i];
      }
    }
    this.value = newValue;
  };
}
