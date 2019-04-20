import React, { Component } from "react";
import Population from "./Population";
import { compare } from "./helper";

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: "Dev Prasan Bhardwaj",
      population: {},
      evolution: []
    };
  }

  update = p => {
    this.setState(state => {
      const evolution = state.evolution;
      evolution.unshift({
        ...compare(p.members[0], p.goal),
        generation: p.generation
      });
      return {
        population: p,
        evolution: evolution
      };
    });
  };
  start = () => {
    this.state.population.stop &&  this.state.population.stop();
    this.setState(()=>({evolution : [], population:{}}));
    const population = new Population({
      goal: this.state.value,
      mutate: 0.1,
      numOfSelection: 2,
      size: 50,
      maxGen: 9999,
      skip: 50
    });
    population.init(this.update);
  };

  render() {
    const { population, evolution, value } = this.state;
    return (
      <div className="container">
        <div>
          <div>
            <textarea
              onChange={e => this.setState({ value: e.target.value })}
              value={value}
              rows={5}
              cols={100}
            />
          </div>
          <button onClick={this.start}>Start</button>
        </div>
        <div className="d-flex">
          <div style={{ minWidth: "400px" }}>
            {/* <h3>{population.goal}</h3> */}
            <p>Mutation Rate {population.mutate}</p>
            {/* <p>CrossOver Point: {population.crossOverPoint}</p>
            <p>Num Of Selection : {population.numOfSelection}</p> */}
            <p>Generation : {population.generation}</p>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Generation</th>
                  <th>Fitness</th>
                  <th>Phrase</th>
                </tr>
              </thead>
              <tbody>
                {evolution.map((ev, index) => {
                  return (
                    <tr key={index}>
                      <td>{ev.generation}</td>
                      <td> {ev.fitness} </td>
                      <td>
                        {ev.chars.map((char, i) => {
                          return (
                            <span
                              key={"char" + index + char.value + i}
                              className={char.match ? "green" : ""}
                            >
                              {char.value}
                            </span>
                          );
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
