import { SAVE_SETTINGS, GET_PRICE_PER_HOUR } from '../actions/settings.actions';
import { settingsInitialState } from '../state/settings.state';

function saveSettings(state, payload) {
    let result = payload.obj;

    if (result) {
        return { ...state, price: result }
    }

    return state;
}

function getPricePerHour(state, payload) {
    let result = payload.obj;

    if (result) {
        return { ...state, price: result }
    }

    return state;
}

export function settingsReducer(state = settingsInitialState, action) {
    switch (action.type) {
        case SAVE_SETTINGS:
            return saveSettings(state, action.payload);
        case GET_PRICE_PER_HOUR:
            return getPricePerHour(state, action.payload);
        default:
            return state;
    }
}