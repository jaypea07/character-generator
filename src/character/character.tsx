import * as React from 'react';
import { CONSTANTS } from '../core/constants';
import { AbilityScore } from './ability-score.model';
import { Utilities } from '../core/utilities';
import './character.css';

export interface CharacterProps {
  stats: Array<AbilityScore>;
}

export interface CharacterState {}

export class Character extends React.Component<CharacterProps, CharacterState> {

  render(): JSX.Element {
    return (
      <section>
        <h2 className="name">{this.randomize(CONSTANTS.RACES)} {this.randomize(CONSTANTS.CLASSES)}!</h2>
        <table>
          <tbody>{this.buildStatList()}</tbody>
        </table>
      </section>
    );
  }

  private buildStatList(): JSX.Element[] {
    const list = this.props.stats.map(stat => {
      return (
        <tr key={stat.name}>
          <td className="ability-name">{stat.name}</td>
          <td>{stat.score}</td>
          {this.buildModifier(stat.modifier)}
        </tr>
      );
    });
    return list;
  }

  /**
   * Formats modifier with either parenthesis or an em-dash.
   */
  private buildModifier(modifier: string): JSX.Element {
    return modifier === '0' ? (<td>&mdash;</td>) : (<td>({modifier})</td>);
  }

  /**
   * Returns a random item from the supplied list.
   */
  private randomize(list: Array<string>): string {
    return list[Utilities.getRandomNumber(0, list.length - 1)];
  }

}
