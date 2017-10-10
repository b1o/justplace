import { NgRedux } from '@angular-redux/store';
import { Component, ViewChild } from '@angular/core';

import { UsersAction } from '../../store/actions/users.action';
import { IAppState } from '../../store/app.state';
import { ModalDirective } from '../../typescripts/free/modals/index';
import { ToastService } from '../../typescripts/pro/alerts/index';

@Component({
    selector: 'start-modal',
    templateUrl: 'startModal.component.html'
})
export class StartModalComponent {
    @ViewChild('form') startForm: ModalDirective

    private id;
    public userCount = 1;
    public description = '';
    public user;

    constructor(
        private toastService: ToastService,
        private usersActions: UsersAction,
        private ngRedux: NgRedux<IAppState>
    ) { }

    open(user) {
        this.id = user.id
        this.user = user
        this.startForm.show()
    }

    onHide() {
        this.userCount = 1;
    }

    plus() {
        this.userCount++;
    }

    minus() {
        if (this.userCount > 1) {
            this.userCount--;
        }
    }

    start() {
        let data = {
            description: this.description,
            userCount: this.userCount,
            user: {
                id: this.id
            }
        };

        this.usersActions.start(data);
        this.startForm.hide();
    }
}