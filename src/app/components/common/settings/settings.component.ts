import { Subscription } from 'rxjs/Rx';
import { IAppState } from '../../../store/index';
import { NgRedux } from '@angular-redux/store';
import { SettingsActions } from '../../../store/actions/settings.actions';
import { ModalDirective } from '../../../typescripts/free/modals/index';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'price-per-hour',
    templateUrl: 'settings.component.html'
})

export class SettingsComponent implements OnInit {
    private subs: Subscription;
    public price;

    constructor(
        private settingsActions: SettingsActions,
        private ngRedux: NgRedux<IAppState>
    ) {
        
    }

    saveSettings() {
        let data = {
                newPrice: this.price 
        }

        this.settingsActions.saveSettings(data);
    }

    ngOnInit() { 
        this.subs = this.ngRedux.select(state => state.settings).subscribe(res => {this.price = res.price});
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}