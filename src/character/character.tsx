import * as React from 'react';
import { AbilityScore } from './ability-score.model';

export class Character extends React.Component<{}, void> {
  private abilityScores: Array<AbilityScore>;
  private requiredScores: Array<string> = [
    'Strength',
    'Dexterity',
    'Constitution',
    'Intelligence',
    'Wisdom',
    'Charisma'
  ];

  componentWillMount() {
    this.abilityScores = this.rollStats(this.requiredScores);

    while (this.isNotHeroic(this.abilityScores)) {
      this.abilityScores = this.rollStats(this.requiredScores);
    }
  }

  render() {
    const statList = this.abilityScores.map(ability => {
      return (
        <tr key={ability.name}>
          <td>{ability.name}</td>
          <td>{ability.score}</td>
          <td>({ability.modifier})</td>
        </tr>
      );
    });

    return (
      <section>
        <h2>Dwarven Wizard</h2>

        <table><tbody>{statList}</tbody></table>
      </section>
    );
  }

  private rollStats(requiredStats: Array<string>): Array<AbilityScore> {
    return requiredStats.map(abilityScore => {
      return new AbilityScore(abilityScore, this.rollSingleStat());
    });
  }

  // roll 4, drop the lowest
  private rollSingleStat(): number {
    let rolls: Array<number> = [];
    let stat = 0;

    for (let i = 0; i < 4; i++) {
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

  // 2 scores 14 or higher
  // total score is 70 or higher
  private isNotHeroic(abilityScores: Array<AbilityScore>): boolean {

    let statsAboveThreshold: number = 0;
    let combinedTotal: number = 0;

    abilityScores.map(stat => {
      combinedTotal += stat.score;
      if (stat.score > 13) {
        ++statsAboveThreshold;
      }
    });

    if (combinedTotal >= 70 && statsAboveThreshold > 1) {
      return false;
    }
    return true;
  }
}
