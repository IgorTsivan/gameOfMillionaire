import { Dispatch } from 'redux';
import { COMPLETED_QUESTION, GET_DATA, SAVE_CURRENT_PRIZE } from './types';
import { QuestionInterface } from '../interfaces/gameData/question.interface';

export const getData = (data: QuestionInterface[]) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: GET_DATA, payload: data });
  };
};

export const completedQuestion = (currentQuestion: number) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: COMPLETED_QUESTION, payload: currentQuestion });
  };
};

export const saveCurrentPrize = (data: number) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: SAVE_CURRENT_PRIZE, payload: data });
  };
};
