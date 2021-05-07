import { SET_AUTHENTICATED_USER } from '../Actions/AuthedUser';

export default function authedUser(state = null, action) {

    if (action.type === SET_AUTHENTICATED_USER) {
        return action.id;
    }

    return state;
}
