import { getInitialData } from '../Utils/API';
import { receiveUsers } from './Users';
import { receiveQuestions } from './Questions';
import { hideLoading, showLoading } from 'react-redux-loading';
import { isLoading} from './Loading';

export function handleInitialData() {
    return dispatch => {

        dispatch(showLoading())

        dispatch(isLoading())

        return getInitialData().then(({ users, questions }) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions))
            dispatch(hideLoading())
            dispatch(isLoading(false))
        });
    };
}

