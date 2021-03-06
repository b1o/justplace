import { Component, OnInit } from '@angular/core';

import { UserModel } from '../../../../models/users/user.model';
import { UsersAction } from '../../../store/actions/users.action';

@Component({
    selector: 'app-register-user',
    templateUrl: 'registerUser.component.html'
})

export class RegisterUserComponent implements OnInit {
    public user: UserModel = new UserModel();
    public output;

    constructor(private usersActions: UsersAction) {

    }

    onPhotoTaken(event) {
        this.user.photo = event.photo;
    }

    register() {
        this.usersActions.registerUser(this.user);
    }

    ngOnInit() { }
}