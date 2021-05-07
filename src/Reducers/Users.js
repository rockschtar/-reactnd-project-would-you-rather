import {
    ADD_ANSWERED_QUESTION_TO_USER,
    ADD_QUESTION_TO_USER,
    RECEIVE_USERS,
} from '../Actions/Users';

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users,
            };
        case ADD_ANSWERED_QUESTION_TO_USER: {
            const { authedUser, questionId, answer } = action;

            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [questionId]: answer,
                    },
                },
            };
        }
        case ADD_QUESTION_TO_USER: {
            const { questionId, authedUser } = action;

            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    questions: state[authedUser].questions.concat(questionId),
                },
            };
        }

        default:
            return state;
    }
}


