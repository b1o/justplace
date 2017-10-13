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
    public discounts = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    public currentDiscount = 0;
    private pricePerHour;

    constructor(
        private toastService: ToastService,
        private usersActions: UsersAction,
        private ngRedux: NgRedux<IAppState>
    ) { }

    getDiscount(discount) {
        this.currentDiscount = discount;
    }

    open(user) {
        this.id = user.id
        this.user = user
        this.startForm.show()
        this.pricePerHour = this.ngRedux.getState().settings.price;
    }

    onHide() {
        this.userCount = 1;
        this.currentDiscount = 0;
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
        let price;

        if (this.currentDiscount === 0) {
            price = this.pricePerHour
        } else {
            price = this.pricePerHour * ((100 - this.currentDiscount) / 100)
        }

        let data = {
            description: this.description,
            userCount: this.userCount,
            user: {
                id: this.id
            },
            pricePerHour: price
        };

        this.usersActions.start(data);
        this.startForm.hide();
    }
}