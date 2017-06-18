import * as React from 'react';
import { CONSTANTS } from '../core/constants';
import { Character } from '../character/character';
import { AbilityScore } from '../character/ability-score.model';
import './app.css';

class App extends React.Component<{}, null> {
  private abilityScores: Array<AbilityScore>;
  
  componentWillMount() {
    this.abilityScores = this.rollStats(CONSTANTS.REQUIRED_STATS);
    while (this.isNotHeroic(this.abilityScores)) {
      this.abilityScores = this.rollStats(CONSTANTS.REQUIRED_STATS);
    }
  }

  render() {
    return (
      <section>
        <h1>Dungeons &amp; Dragons Character Generator</h1>
        <h2>I'm going to roll a...</h2>
        <Character stats={this.rollStats(CONSTANTS.REQUIRED_STATS)} />
        <button>That's dumb. Roll again!</button>
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
    return this.getRandomNumber(1, 6);
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // 2 scores 14 or higher
  // total score is 70 or higher
  private isNotHeroic(abilityScores: Array<AbilityScore>): boolean {
    let combinedTotal: number = 0;
    let statsAboveThreshold: number = 0;

    abilityScores.map(stat => {
      combinedTotal += stat.score;
      if (stat.score >= CONSTANTS.REQUIRED_STATS_THRESHOLD) {
        ++statsAboveThreshold;
      }
    });

    if (combinedTotal >= CONSTANTS.REQUIRED_STAT_TOTAL && 
        statsAboveThreshold >= CONSTANTS.REQUIRED_STATS_ABOVE_THRESHOLD) {
      return false;
    }
    return true;
  }
}

export default App;
