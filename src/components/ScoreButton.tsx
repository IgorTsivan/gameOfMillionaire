import React, { FC, useCallback } from 'react';
import { prizeConverter } from '../helpers/prizeConverter';

interface Props {
  prize: number;
  index: number;
  currentQuestion: number;
}

export const ScoreButton: FC<Props> = ({ prize, index, currentQuestion }: Props) => {
  const getStateOfPrize = useCallback((): string => {
    let color = '';
    if (currentQuestion === index) {
      color = 'selected';
    }
    if (currentQuestion > index) {
      color = 'past';
    }
    return color;
  }, [currentQuestion]);

  return (
    <div role="presentation" className={`scoreButton ${getStateOfPrize()}`}>
      <span className="scoreButton--line left" />
      <span className="scoreButton--line right" />
      <span className="scoreButton--prize">{prizeConverter(prize)}</span>
    </div>
  );
};
