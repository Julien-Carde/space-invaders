// src/Bullet.js
import React from 'react';

function Bullet({ x, y }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x + 8,
        top: y - 22,
        width: 5,
        height: 10,
        backgroundColor: 'white',
      }}
    />
  );
}

export default Bullet;