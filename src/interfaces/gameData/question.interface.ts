import { AnswerInterface } from './answer.interface';

export interface QuestionInterface {
  id: number;
  question: string;
  answers: AnswerInterface[];
  isCompleted: boolean;
  prize: number;
}
