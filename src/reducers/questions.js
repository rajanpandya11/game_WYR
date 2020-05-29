import { RECEIVE_QUESTIONS, ANSWERS_QUESTIONS } from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ANSWERS_QUESTIONS:
      return {
        ...state
      };
    default:
      return state;
  }
}
