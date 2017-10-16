import { ModalDirective } from '../../typescripts/free/modals/index';
import { NgRedux } from '@angular-redux/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { UsersAction } from '../../store/actions/users.action';
import { IAppState } from '../../store/index';

@Component({
    selector: 'payment-modal',
    templateUrl: 'paymentModal.component.html'
})

export class PaymentModalComponent implements OnInit {

    @ViewChild('paymentForm') paymentForm: ModalDirective;
    
    public session;
    public user;

    constructor(
        private usersAction: UsersAction,
        private ngRedux: NgRedux<IAppState>
    ) { }

    open(user, session) {
        this.session = session;
        this.user = user;
        this.paymentForm.show();
    }

    pay(userId, sessionId) {
        this.usersAction.pay(userId, sessionId);
        this.paymentForm.hide();
    }

    ngOnInit() {

    }
}