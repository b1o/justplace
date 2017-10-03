import { CLOSE_SIDENAV, OPEN_SIDENAV } from '../actions/layout.actions';
import { initialState } from '../state/layout.state';


export function layoutReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_SIDENAV:
            return { ...state, sidenavOpen: true };
        case CLOSE_SIDENAV:
            return { ...state, sidenavOpen: false };
        default:
            return state;
    }
}