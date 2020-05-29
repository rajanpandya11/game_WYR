export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWERS_QUESTIONS = "ANSWERS_QUESTIONS";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export function answersQuestions(theObject) {
  return {
    type: ANSWERS_QUESTIONS,
    theObject
  };
}
