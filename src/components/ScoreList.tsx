import React, { Dispatch, FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScoreButton } from './ScoreButton';
import { saveCurrentPrize } from '../store/actions';
import { AppState } from '../store';
import { QuestionInterface } from '../interfaces/gameData/question.interface';

interface Props {
  currentQuestion: number;
}

export const ScoreList: FC<Props> = ({ currentQuestion }: Props) => {
  const dispatch: Dispatch<any> = useDispatch();
  const data: QuestionInterface[] = useSelector((state: AppState) => state.game.data);
  const prizeList: number[] = data.map((item) => item.prize);
  const getCurrentPrize = useMemo(() => {
    return data.filter((item) => item.isCompleted);
  }, [data]);
  useEffect(() => {
    dispatch(saveCurrentPrize(getCurrentPrize[getCurrentPrize.length - 1]?.prize || 0));
  }, [data]);
  return (
    <div role="presentation" className="scoreList">
      {prizeList.map((prize, index) => {
        return (
          <ScoreButton key={prize} prize={prize} index={index} currentQuestion={currentQuestion} />
        );
      })}
    </div>
  );
};
