import { RECEIVE_USERS, ADD_VOTE } from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case ADD_VOTE:
      let { theUser, theQuestion, theAnswer } = action.theObject;
      return {
        ...state,
        [theUser]: {
          ...state[theUser],
          answers: {
            ...state[theUser].answers,
            [theQuestion]: [theAnswer]
          }
        }
      };
    default:
      return state;
  }
}
