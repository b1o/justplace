import { SettingsActions } from '../../../store/actions/settings.actions';
import { ModalDirective } from '../../../typescripts/free/modals/index';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'price-per-hour',
    templateUrl: 'settings.component.html'
})

export class SettingsComponent implements OnInit {
    public price;

    constructor(private settingsActions: SettingsActions) { }

    saveSettings() {
        this.settingsActions.saveSettings();
    }

    ngOnInit() { }
}