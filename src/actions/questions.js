import { addVote } from "../actions/users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWERS_QUESTIONS = "ANSWERS_QUESTIONS";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

function handleAnswersQuestions(theObject) {
  return {
    type: ANSWERS_QUESTIONS,
    theObject
  };
}

export function answersQuestions(theObject) {
  return dispatch => {
    dispatch(handleAnswersQuestions(theObject));
    dispatch(addVote(theObject));
  };
}
