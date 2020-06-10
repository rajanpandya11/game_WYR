import {
  RECEIVE_QUESTIONS,
  ANSWERS_QUESTIONS,
  ADD_QUESTION
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ANSWERS_QUESTIONS:
      let { authedUser, qid, answer } = action.theObject;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat(authedUser)
          }
        }
      };
    case ADD_QUESTION:
      let { question } = action;
      return {
        ...state,
        [question.id]: question
      };
    default:
      return state;
  }
}
