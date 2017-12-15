import { Component, Input, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { UsersAction } from 'app/store/actions/users.action';
import { IAppState } from 'app/store';
import { UserModel } from 'models/users/user.model';

@Component({
    selector: 'edit-user',
    templateUrl: 'editUser.component.html'
})

export class EditUserComponent implements OnInit {
    @Input() user = new UserModel();

    constructor(
        private usersAction: UsersAction,
        private ngRedux: NgRedux<IAppState>
    ) { }

    submitEditUser() {
        this.usersAction.editUser(this.user);
    }

    onPhotoTaken(event) {
        this.user.photo = event.photo;
    }

    ngOnInit() { }
}