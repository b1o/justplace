import { IAppState } from '../../store/app.state';
import { NgRedux } from 'ng2-redux';
import { UsersAction } from '../../store/actions/users.action';
import { ToastService } from '../../typescripts/pro/alerts/index';
import { ModalDirective } from '../../typescripts/free/modals/index';
import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'start-modal',
    templateUrl: 'startModal.component.html'
})
export class StartModalComponent {
    @ViewChild('form') startForm: ModalDirective

    private id;
    private userCount = 1;
    private description = '';

    constructor(
        private toastService: ToastService,
        private usersActions: UsersAction,
        private ngRedux: NgRedux<IAppState>
    ) { }

    open(id) {
        this.id = id
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
        
        this.usersActions.start(data)
        this.ngRedux
            .select(state => state)
    }
}