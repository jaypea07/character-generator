import * as React from 'react';
import { CONSTANTS } from '../core/constants';
import { Character } from '../character/character';
import { AbilityScore } from '../character/ability-score.model';
import { Utilities } from './utilities';
import './app.css';

export interface AppState {
  abilityScores: Array<AbilityScore>;
}

class App extends React.Component<{}, AppState> {

  constructor() {
    super();
    this.createNewCharacter = this.createNewCharacter.bind(this);
  }
  
  componentWillMount() {
    this.createNewCharacter();
  }

  render(): JSX.Element {
    return (
      <section>
        <h1>Dungeons &amp; Dragons Character Generator</h1>
        <h2>I'm going to roll a...</h2>
        <Character stats={this.state.abilityScores} />
        <button onClick={this.createNewCharacter}>That's dumb. Roll again!</button>
      </section>
    );
  }

  private createNewCharacter(): void {
    this.setState({
      abilityScores: this.rollStats(CONSTANTS.REQUIRED_STATS)
    });
  }

  /**
   * Constructs an array of stats based on the array of required stats
   * that's passed in. Each required stat is rolled.
   */
  private rollStats(requiredStats: Array<string>): Array<AbilityScore> {
    const stats: Array<AbilityScore> = requiredStats.map(abilityScore => {
      return new AbilityScore(abilityScore, this.rollSingleStat());
    });

    return this.validateStats(stats);
  }

  /**
   * If the stats that are passed in don't pass validation (they aren't
   * heroic), the stats are rolled again.
   */
  private validateStats(stats: Array<AbilityScore>): Array<AbilityScore> {
    while (this.isNotHeroic(stats)) {
      stats = this.rollStats(CONSTANTS.REQUIRED_STATS);
    }

    return stats;
  }

  /**
   * Rolls four six-sided dice and drops the lowest roll.
   */
  private rollSingleStat(): number {
    let rolls: Array<number> = [];
    let stat: number = 0;

    for (let i = 0; i < 4; i++) {
      rolls.push(Utilities.getRandomNumber(1, 6));
    }

    rolls.sort().shift();
    rolls.map(roll => {
      stat += roll;
    });

    return stat;
  }

  /**
   * A validation function that returns true if the stats are NOT
   * valid. Validity is determined if the combined total of stats
   * are above a configured amount and if there are least X number of
   * stats above Y threshold, where X and Y are also configured.
   */
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
