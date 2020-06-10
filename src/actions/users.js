export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_VOTE = "ADD_VOTE";
export const ADD_USER_QUESTION = "ADD_USER_QUESTION";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

export function addVote(theObject) {
  return {
    type: ADD_VOTE,
    theObject
  };
}

export function addQuestionToUser(theObject) {
  return {
    type: ADD_USER_QUESTION,
    theObject
  };
}
