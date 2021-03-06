import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

import { IAppState } from '../index';

export const OPEN_SIDENAV = '[LAYOUT] open sidenav';
export const CLOSE_SIDENAV = '[LAYOUT] close sidenav';

@Injectable()
export class LayoutActions {

    constructor(private ngRedux: NgRedux<IAppState>) {

    }

    openSidenav() {
        this.ngRedux.dispatch({ type: OPEN_SIDENAV });
    }

    closeSidenav() {
        this.ngRedux.dispatch({ type: CLOSE_SIDENAV });
    }
}
