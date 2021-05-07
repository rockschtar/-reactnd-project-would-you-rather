export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_ANSWERED_QUESTION_TO_USER = 'ADD_ANSWERED_QUESTION_TO_USER'
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    };
}

export function addAnsweredQuestionToUser(questionId, authedUser, answer) {
    return {
        type: ADD_ANSWERED_QUESTION_TO_USER,
        questionId,
        authedUser,
        answer
    };
}

export function addQuestionToUser(questionId, authedUser) {
    return {
        type: ADD_QUESTION_TO_USER,
        questionId,
        authedUser
    };
}