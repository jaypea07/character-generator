import * as React from 'react';
import { CONSTANTS } from '../core/constants';
import { Character } from '../character/character';
import { AbilityScore } from '../character/ability-score.model';
import './app.css';

export interface AppState {
  abilityScores: Array<AbilityScore>;
}

class App extends React.Component<{}, AppState> {
  
  componentWillMount() {
    this.createNewCharacter();
  }

  render() {
    return (
      <section>
        <h1>Dungeons &amp; Dragons Character Generator</h1>
        <h2>I'm going to roll a...</h2>
        <Character stats={this.state.abilityScores} />
        <button onClick={this.createNewCharacter.bind(this)}>That's dumb. Roll again!</button>
      </section>
    );
  }

  private createNewCharacter(): void {
    this.setState({
      abilityScores: this.rollStats(CONSTANTS.REQUIRED_STATS)
    });
  }

  private rollStats(requiredStats: Array<string>): Array<AbilityScore> {
    const stats = requiredStats.map(abilityScore => {
      return new AbilityScore(abilityScore, this.rollSingleStat());
    });

    return this.validateStats(stats);
  }

  private validateStats(stats: Array<AbilityScore>): Array<AbilityScore> {
    while (this.isNotHeroic(stats)) {
      stats = this.rollStats(CONSTANTS.REQUIRED_STATS);
    }

    return stats;
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
