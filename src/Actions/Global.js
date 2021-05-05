import { getInitialData } from '../Utils/API';
import { receiveUsers } from './Users';

export function handleInitialData() {
    return dispatch => {
        return getInitialData().then(({ users }) => {
            dispatch(receiveUsers(users));
        });
    };
}
