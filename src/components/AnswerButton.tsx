import React, { FC, useCallback } from 'react';
import { LETTER } from '../helpers/constants/letter';

interface Props {
  selected: (isRightAnswer: boolean, id: number) => void;
  index: number;
  answer: string;
  isRight: boolean;
  id: number;
  selectedAnswerId: number | null;
  selectedAnswerColor: number | null;
  disabled: boolean;
}

export const AnswerButton: FC<Props> = ({
  selected,
  index,
  answer,
  isRight,
  id,
  selectedAnswerId,
  selectedAnswerColor,
  disabled,
}: Props) => {
  const getLetter = (numberOfAnswer: number): string => {
    return LETTER[numberOfAnswer];
  };

  const getColor = useCallback((): string => {
    let color = '';
    if (selectedAnswerId === id) {
      color = 'selected';
    }
    if (selectedAnswerColor === id) {
      if (isRight) {
        color = 'success';
      } else {
        color = 'wrong';
      }
    }

    return color;
  }, [selectedAnswerId, selectedAnswerColor]);

  return (
    <div
      role="presentation"
      onClick={() => selected(isRight, id)}
      className={`answerButton ${getColor()} ${disabled ? 'disabled' : ''}`}
    >
      <span className="answerButton--line left" />
      <span className="answerButton--line right" />
      <span className="answerButton--number">{getLetter(index)}</span>
      <span className="answerButton--answer">{answer}</span>
    </div>
  );
};
