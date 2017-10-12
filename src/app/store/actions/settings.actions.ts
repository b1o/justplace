import { NetworkService } from '../../services/network.service';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

import { IAppState } from '../app.state';

export const SAVE_SETTINGS = 'settings/SAVE';

@Injectable()
export class SettingsActions {
    constructor(
        private ngRedux: NgRedux<IAppState>,
        private networkService: NetworkService
    ) { }

    saveSettings() {
        let url="";
        let data="";

        this.networkService
            .post(url, data)
            .subscribe(res => {
                this.ngRedux.dispatch({
                    type: SAVE_SETTINGS,
                    payload: res
                })
            });
    }
}