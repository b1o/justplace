import { SAVE_SETTINGS } from '../actions/settings.actions';
import { settingsInitialState } from '../state/settings.state';

function saveSettings(state, payload) {

}

export function layoutReducer(state = settingsInitialState, action) {
    switch (action.type) {
        case SAVE_SETTINGS:
            return saveSettings(state, action.payload);
        default:
            return state;
    }
}