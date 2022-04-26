import React from 'react';
import { Link } from 'react-router-dom';
import FiveImg from '../assets/img/five.png';

export const StartPage = () => {
  return (
    <div className="startPage">
      <div className="startPage--img">
        <img src={FiveImg} alt="img" />
      </div>
      <div className="startPage--content">
        <p>Who wants to be a millionaire?</p>
        <Link className="btn" to="/game">
          Start
        </Link>
      </div>
    </div>
  );
};
