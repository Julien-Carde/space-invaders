// src/Game.js
import React, { useState, useEffect } from 'react';
import Player from './Player';
import Invader from './Invader';
import Bullet from './Bullet';

function Game() {
  const [playerPosition, setPlayerPosition] = useState(270);
  const [bullets, setBullets] = useState([]);
  const [invaders, setInvaders] = useState([]);
  const [invaderDirection, setInvaderDirection] = useState(1);
  const [gameState, setGameState] = useState('start');

  // Inside the Game component
useEffect(() => {
    if (gameState === 'start') {
      document.getElementById('start-screen').focus();
    }
  }, [gameState]);
  

  // Initialize invaders
  useEffect(() => {
    const initialInvaders = [];
    for (let row = 0; row < 3; row++) {
      for (let i = 0; i < 8; i++) {
        initialInvaders.push({ x: i * 60 + 20, y: row * 60 + 20 });
      }
    }
    setInvaders(initialInvaders);
  }, []);

  // Handle player movement and shooting
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setPlayerPosition((pos) => Math.max(pos - 20, 0));
      } else if (e.key === 'ArrowRight') {
        setPlayerPosition((pos) => Math.min(pos + 20, 540));
      } else if (e.key === ' ') {
        // Fire bullet
        setBullets((bullets) => [
          ...bullets,
          { x: playerPosition + 15, y: 480 },
        ]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPosition]);

  // Update bullets
  useEffect(() => {
    const interval = setInterval(() => {
      setBullets((bullets) =>
        bullets
          .map((bullet) => ({ ...bullet, y: bullet.y - 10 }))
          .filter((bullet) => bullet.y > 0)
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Update invaders
  useEffect(() => {
    const interval = setInterval(() => {
      setInvaders((invaders) => {
        // Change direction at edges
        const atEdge = invaders.some(
          (invader) => invader.x <= 0 || invader.x >= 540
        );
        if (atEdge) {
          setInvaderDirection((dir) => -dir);
          return invaders.map((invader) => ({
            ...invader,
            y: invader.y + 20,
          }));
        }
        return invaders.map((invader) => ({
          ...invader,
          x: invader.x + invaderDirection * 10,
        }));
      });
    }, 500);
    return () => clearInterval(interval);
  }, [invaderDirection]);

  // Collision detection
  useEffect(() => {
    setBullets((bullets) =>
      bullets.filter((bullet) => {
        let hit = false;
        setInvaders((invaders) =>
          invaders.filter((invader) => {
            if (
              bullet.x >= invader.x &&
              bullet.x <= invader.x + 40 &&
              bullet.y >= invader.y &&
              bullet.y <= invader.y + 40
            ) {
              hit = true;
              return false; // Remove the invader
            }
            return true;
          })
        );
        return !hit; // Remove the bullet if it hit
      })
    );
  }, [bullets]);

  

  // Inside the return statement of the Game component
if (gameState === 'start') {
    return (
      <div
        id="start-screen"
        style={{
          position: 'relative',
          width: 600,
          height: 500,
          background: 'black',
          overflow: 'hidden',
          margin: '0 auto',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
        }}
        onKeyDown={(e) => setGameState('playing')}
        tabIndex="0"
      >
        <h3 className='start-message'>Press any key to start</h3>
      </div>
    );
  }

  return (

    
    <div
      style={{
        position: 'relative',
        width: 600,
        height: 500,
        background: 'black',
        overflow: 'hidden',
        margin: '0 auto',
      }}
    >
      <Player x={playerPosition} />
      {invaders.map((invader, index) => (
        <Invader key={index} x={invader.x} y={invader.y} />
      ))}
      {bullets.map((bullet, index) => (
        <Bullet key={index} x={bullet.x} y={bullet.y} />
      ))}
    </div>
  );
}

export default Game;