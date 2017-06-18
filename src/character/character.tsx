import * as React from 'react';
import { CONSTANTS } from '../core/constants';
import { AbilityScore } from './ability-score.model';
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

  private buildModifier(modifier: string): JSX.Element {
    return modifier === '0' ? (<td>&mdash;</td>) : (<td>({modifier})</td>);
  }

  private randomize(list: Array<string>): string {
    return list[this.getRandomNumber(0, list.length - 1)];
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

}
