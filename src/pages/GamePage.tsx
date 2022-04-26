import React, { Dispatch, FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../store';
import { AnswerButton } from '../components/AnswerButton';
import useDebounce from '../hooks/useDebounce';
import { ScoreList } from '../components/ScoreList';
import { completedQuestion, getData } from '../store/actions';
import { GameDataMock } from '../data/mock/gameData.mock';
import { QuestionInterface } from '../interfaces/gameData/question.interface';

export const GamePage: FC = () => {
  const DELAY_BEFORE_NEXT_QUESTION = 1500;
  const DELAY_GET_COLOR_BUTTON = 700;
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [selectedAnswerColor, setSelectedAnswerColor] = useState<number | null>(null);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const data: QuestionInterface[] = useSelector((state: AppState) => state.game.data);
  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    dispatch(getData(GameDataMock));
    return () => dispatch(getData(GameDataMock));
  }, [dispatch]);
  const checkAnswer = (isRightAnswer: boolean): void => {
    if (isRightAnswer) {
      if (currentQuestion < data.length - 1) {
        setCurrentQuestion((current) => current + 1);
        dispatch(completedQuestion(currentQuestion));
      } else {
        dispatch(completedQuestion(currentQuestion));
        navigate('/game-over');
      }
    } else {
      navigate('/game-over');
    }
    setSelectedAnswerId(null);
    setSelectedAnswerColor(null);
    setDisableButton(false);
  };
  const toggleMenuHandler = useCallback((): void => {
    setToggleMenu((toggle) => !toggle);
  }, [toggleMenu]);
  const getCurrentAnswerId = (id: number): number => {
    return data[currentQuestion].answers.filter((item) => item.id === id)[0].id;
  };
  const getColorButton = (currentId: number): void => {
    setSelectedAnswerColor(currentId);
    setDisableButton(true);
  };
  const debounceAnswer = useDebounce(checkAnswer, DELAY_BEFORE_NEXT_QUESTION);
  const debounceCurrentAnswerColor = useDebounce(getColorButton, DELAY_GET_COLOR_BUTTON);
  const debounceCurrentAnswerId = useDebounce(setSelectedAnswerId, 0);
  const nextQuestion = (isRightAnswer: boolean, id: number): void => {
    const currentId: number = getCurrentAnswerId(id);
    debounceCurrentAnswerColor(currentId);
    debounceCurrentAnswerId(currentId);
    debounceAnswer(isRightAnswer);
  };

  return (
    <div className="gamePage">
      {data && data.length ? (
        <>
          <div
            role="presentation"
            onClick={toggleMenuHandler}
            className={`burger ${toggleMenu ? 'close' : ''}`}
          >
            <span />
            <span />
            <span />
          </div>
          <div className={`gamePage--questions-block ${toggleMenu ? 'hide' : 'show'}`}>
            <p className="question">{data[currentQuestion].question}</p>
            <div className="answers">
              {data[currentQuestion].answers.map(({ answer, id, isRight }, index: number) => {
                return (
                  <AnswerButton
                    key={id}
                    index={index}
                    selected={nextQuestion}
                    answer={answer}
                    isRight={isRight}
                    id={id}
                    selectedAnswerId={selectedAnswerId}
                    selectedAnswerColor={selectedAnswerColor}
                    disabled={disableButton}
                  />
                );
              })}
            </div>
          </div>
          <div className={`gamePage--score-block ${toggleMenu ? 'show' : 'hide'}`}>
            <ScoreList currentQuestion={currentQuestion} />
          </div>
        </>
      ) : null}
    </div>
  );
};
