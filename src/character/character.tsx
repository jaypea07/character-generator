import * as React from 'react';

export class Character extends React.Component<{}, void> {
  render() {
    return (
      <section>
        <h2>Dwarven Wizard</h2>

        <table>
          <tr>
            <td>Strength</td>
            <td>13</td>
            <td>(+1)</td>
          </tr>
          <tr>
            <td>Dexterity</td>
            <td>13</td>
            <td>(+1)</td>
          </tr>
          <tr>
            <td>Constituion</td>
            <td>13</td>
            <td>(+1)</td>
          </tr>
          <tr>
            <td>Intelligence</td>
            <td>13</td>
            <td>(+1)</td>
          </tr>
          <tr>
            <td>Wisdom</td>
            <td>13</td>
            <td>(+1)</td>
          </tr>
          <tr>
            <td>Charisma</td>
            <td>13</td>
            <td>(+1)</td>
          </tr>
        </table>
      </section>
    );
  }
}
