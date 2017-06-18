import * as React from 'react';
import { AbilityScore } from './ability-score.model';

export class Character extends React.Component<{}, void> {
  private abilityScores: Array<any>;
  private requiredScores : Array<any> = [
    'Strength',
    'Dexterity',
    'Constitution',
    'Intelligence',
    'Wisdom',
    'Charisma'
  ];

  componentWillMount() {
    this.abilityScores = this.rollStats(this.requiredScores);
  }

  render() {
    const statList = this.abilityScores.map(ability => {
      return  <tr>
                <td>{ability.name}</td>
                <td>{ability.score}</td>
                <td>({ability.modifier})</td>
              </tr>;
    });

    return (
      <section>
        <h2>Dwarven Wizard</h2>

        <table>{statList}</table>
      </section>
    );
  }

  private rollStats(requiredStats: Array<string>): Array<AbilityScore> {
    return requiredStats.map(abilityScore => {
      return new AbilityScore(abilityScore, this.rollSingleStat());
    });
  }

  //roll 4, drop the lowest
  private rollSingleStat(): number {
    let rolls: Array<number> = [];
    let stat = 0;

    for(let i = 0; i < 4; i++) {
      rolls.push(this.rollD6());
    }

    rolls.sort().shift();
    rolls.map(roll => {
      stat += roll;
    });

    return stat;
  }

  private rollD6(): number {
    return Math.floor(Math.random() * 6 + 1);
  }
}
