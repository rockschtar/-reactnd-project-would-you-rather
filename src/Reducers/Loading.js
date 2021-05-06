import { IS_LOADING } from '../Actions/Loading';

export default function isLoading(state = null, action) {

    if (action.type === IS_LOADING) {
        return action.isLoading;
    }

    return state;
}
