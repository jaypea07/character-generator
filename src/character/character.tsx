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
      return new AbilityScore(abilityScore, this.rollD20());
    });
  }

  private rollD20() {
    return Math.floor(Math.random() * 19 + 1);
  }
}
