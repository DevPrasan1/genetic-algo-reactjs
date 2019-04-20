import Phrase from "./Phrase";

export default class Population {
  constructor({
    goal,
    mutate,
    crossOverPoint,
    numOfSelection,
    size,
    maxGen,
    skip
  }) {
    this.goal = goal;
    this.mutate = mutate || 0.1;
    this.crossOverPoint = crossOverPoint || 0.5;
    this.numOfSelection = numOfSelection || 2;
    this.members = [];
    this.generation = 0;
    this.mattingPool = [];
    this.size = size;
    this.maxGen = maxGen;
    this.skip = skip || 10;
    this.intervalId = null;
  }

  create = size => {
    while (size--) {
      const phrase = new Phrase();
      phrase.create(this.goal.length);
      phrase.calFitness(this.goal);
      this.members.push(phrase);
    }
    this.sort();
    this.generation += 1;
  };

  sort = () => {
    this.members = this.members.sort((b, a) => a.fitness - b.fitness);
  };

  updateMattingPool = () => {
    this.mattingPool = [];
    // const maxFitness = this.members.reduce((acc,curr)=> acc + curr.fitness,0);
    for (let i = 0; i <= this.members.length / 2; i++) {
      const phrase = this.members[i];
      for (let i = 0; i < phrase.fitness; i++) {
        this.mattingPool.push(phrase);
      }
    }
    // this.members.forEach(phrase => {
    //   for (let i = 0; i < phrase.fitness; i++) {
    //     this.mattingPool.push(phrase);
    //   }
    // });
  };
  getRandomChildFromMattingPool = () => {
    return (
      this.mattingPool[Math.floor(Math.random() * this.mattingPool.length)] ||
      this.mattingPool[0]
    );
  };

  nextGeneration = () => {
    this.updateMattingPool();
    const newMembers = this.members.map(() => {
      const randomPhrase = this.getRandomChildFromMattingPool();
      const phrase = new Phrase(this.getRandomChildFromMattingPool().value);
      phrase.crossOver(randomPhrase);
      phrase.mutate(this.mutate);
      phrase.calFitness(this.goal);
      return phrase;
    });
    this.members = newMembers;
    this.sort();
    this.generation += 1;
  };
  stop = () =>{
    this.intervalId && clearInterval(this.intervalId);
    this.intervalId = null;
  }
  init = cb => {
    let gen = 1;
    this.create(this.size);
    this.intervalId = setInterval(() => {
      // while (true) {
      if (this.members[0].value === this.goal || gen > this.maxGen) {
        cb(this);
        clearInterval(this.intervalId);
        return;
      }
      this.nextGeneration();
      gen++;
      if (gen % this.skip === 0) {
        cb(this);
      }
      // }
    }, 0);
  };
}
