import * as React from 'react';

export class Character extends React.Component<{}, void> {
  private abilityScores: Array<any>;

  componentWillMount() {
    this.abilityScores = [
      {
        name: 'Strength',
        score: 13,
        modifier: 1,
      },
      {
        name: 'Dexterity',
        score: 13,
        modifier: 1,
      },
      {
        name: 'Constituion',
        score: 13,
        modifier: 1,
      },
      {
        name: 'Intelligence',
        score: 13,
        modifier: 1,
      },
      {
        name: 'Wisdom',
        score: 13,
        modifier: 1,
      },
      {
        name: 'Charisma',
        score: 13,
        modifier: 1,
      }
    ];
  }

  render() {
    const statList = this.abilityScores.map(ability => {
      return  <tr>
                <td>{ability.name}</td>
                <td>{ability.score}</td>
                <td>{ability.modifier}</td>
              </tr>;
    });

    return (
      <section>
        <h2>Dwarven Wizard</h2>

        <table>{statList}</table>
      </section>
    );
  }

  // private rollD20() {
  //   return Math.floor(Math.random() * 19 + 1);
  // }
}
