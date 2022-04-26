import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FiveImg from '../assets/img/five.png';
import { AppState } from '../store';
import { prizeConverter } from '../helpers/prizeConverter';

export const GameOver = () => {
  const getCurrentPrize: number = useSelector((state: AppState) => state.game.currentPrize);
  return (
    <div className="gameOverPage">
      <div className="gameOverPage--img">
        <img src={FiveImg} alt="img" />
      </div>
      <div className="gameOverPage--content">
        <p className="score">Total score:</p>
        <p className="info">{prizeConverter(getCurrentPrize)} earned</p>
        <Link className="btn" to="/game">
          Try again
        </Link>
      </div>
    </div>
  );
};
