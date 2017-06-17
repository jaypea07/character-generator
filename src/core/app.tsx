import * as React from 'react';
import './app.css';

class App extends React.Component<{}, null> {
  render() {
    return (
      <section>
        <h1>Dungeons &amp; Dragons Character Generator</h1>
        <h2>I'm going to roll a...</h2>
        <p>Generated character goes here.</p>
      </section>
    );
  }
}

export default App;
