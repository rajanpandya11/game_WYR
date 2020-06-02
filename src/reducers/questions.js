import { RECEIVE_QUESTIONS, ANSWERS_QUESTIONS } from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ANSWERS_QUESTIONS:
      let { theUser, theQuestion, theAnswer } = action.theObject;
      return {
        ...state,
        [theQuestion]: {
          ...state[theQuestion],
          [theAnswer]: {
            ...state[theQuestion][theAnswer],
            votes: state[theQuestion][theAnswer].votes.concat(theUser)
          }
        }
      };
    default:
      return state;
  }
}
