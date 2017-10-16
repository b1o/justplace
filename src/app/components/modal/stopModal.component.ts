import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { UsersAction } from '../../store/actions/users.action';
import { IAppState } from '../../store/index';
import { ModalDirective } from '../../typescripts/free/modals/index';

export const pricePerHour = 10;

@Component({
    selector: 'stop-modal',
    templateUrl: 'stopModal.component.html'
})

export class StopModalComponent implements OnInit {

    @ViewChild('form') stopForm: ModalDirective;
    private subscription: Subscription;
    public user;
    public price = '0';
    public id;


    constructor(
        private usersAction: UsersAction,
        private ngRedux: NgRedux<IAppState>,
        private router: Router
    ) { }

    open(user) {
        this.user = user;
        this.id = user.id;
        this.subscription = this.ngRedux
            .select(state => state.allUsers.allUsers.find((u: any) => u.id === this.id))
            .subscribe((data: any) => {
                this.price = data.price;
            })
        this.stopForm.show();
    }

    stop() {
        this.subscription.unsubscribe()
        this.usersAction.stop(this.id);
        this.stopForm.hide();
        this.router.navigate([`/users/${this.id}`])
    }

    ngOnInit() {

    }
}