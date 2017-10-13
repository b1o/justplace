import { NetworkService } from '../../services/network.service';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

import { IAppState } from '../app.state';

export const SAVE_SETTINGS = 'settings/SAVE';
export const GET_PRICE_PER_HOUR = 'settings/GET_PRICE'

@Injectable()
export class SettingsActions {
    constructor(
        private ngRedux: NgRedux<IAppState>,
        private networkService: NetworkService
    ) { }

    saveSettings(data) {
        let url="/pricePerHour";

        this.networkService
            .post(url, data)
            .subscribe(res => {
                this.ngRedux.dispatch({
                    type: SAVE_SETTINGS,
                    payload: res
                })
            });
    }

    getPrice() {
        let url="/pricePerHour";

        this.networkService
            .get(url)
            .subscribe(res => {
                this.ngRedux.dispatch({
                    type: GET_PRICE_PER_HOUR,
                    payload: res
                })
            })
    }
}