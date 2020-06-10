import { RECEIVE_USERS, ADD_VOTE, ADD_USER_QUESTION } from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case ADD_VOTE:
      let { authedUser, qid, answer } = action.theObject;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: [answer]
          }
        }
      };
    case ADD_USER_QUESTION:
      let { id, author } = action.theObject;
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(id)
        }
      };
    default:
      return state;
  }
}
