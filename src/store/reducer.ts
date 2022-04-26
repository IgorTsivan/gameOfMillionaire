import { AnyAction } from 'redux';
import { SAVE_CURRENT_PRIZE, COMPLETED_QUESTION, GET_DATA } from './types';
import { QuestionInterface } from '../interfaces/gameData/question.interface';

interface InitialState {
  data: QuestionInterface[];
  currentPrize: number;
}

const initialState: InitialState = {
  data: [],
  currentPrize: 0,
};

export const gameReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_DATA:
      return { ...state, data: action.payload };
    case SAVE_CURRENT_PRIZE:
      return { ...state, currentPrize: action.payload };
    case COMPLETED_QUESTION:
      return {
        ...state,
        data: state.data.map((item, index) => {
          if (index === action.payload) {
            return { ...item, isCompleted: true };
          }
          return { ...item };
        }),
      };
    default:
      return state;
  }
};
