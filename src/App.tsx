import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { StartPage } from './pages/StartPage';
import { GamePage } from './pages/GamePage';
import { GameOver } from './pages/GameOver';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/game-over" element={<GameOver />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};
