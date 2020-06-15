import { addVote, addQuestionToUser } from "../actions/users";
import { saveQuestionAnswer, saveQuestion } from "../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWERS_QUESTIONS = "ANSWERS_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

function answersQuestions(theObject) {
  return {
    type: ANSWERS_QUESTIONS,
    theObject
  };
}

function addQuestion(theObject) {
  return {
    type: ADD_QUESTION,
    theObject
  };
}

export function handleAnswersQuestions(theObject) {
  return dispatch => {
    dispatch(answersQuestions(theObject));
    dispatch(addVote(theObject));

    console.log("going for api call , the object is: ", theObject);

    return saveQuestionAnswer(theObject).catch(e => {
      console.warn("Error in handleAnswersQuestions:", e);
    });
  };
}

export function handleSaveQuestion(theObject) {
  return dispatch => {
    return saveQuestion(theObject).then(question => {
      console.log("question: ", question);
      dispatch(addQuestion(question));
      dispatch(addQuestionToUser(question));
    });
  };
}
