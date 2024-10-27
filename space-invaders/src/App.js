// src/App.js
import React from 'react';
import Game from './Game';

function App() {
  return (
    <div>
      <h1>Space Invaders</h1>
      <Game />
      <div className='instructions'>
        <strong>Move :</strong> Arrow Keys<br/>
        <strong>Shoot :</strong> Spacebar
      </div>
    </div>
  );
}

export default App;