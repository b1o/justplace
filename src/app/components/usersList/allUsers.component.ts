import { UsersService } from '../../services/users.service';
import { StartModalComponent } from '../modal/startModal.component';
import { NetworkService } from '../../services/network.service';
import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'all-users-list',
    templateUrl: 'allUsers.component.html'
})
export class AllUsersComponent {
    @ViewChild(StartModalComponent) startModal: StartModalComponent;

    private allUsersPath = 'users';
    private responseUsers;
    private btn = "start";
    private currentUser;
    

    constructor (
        private networkService: NetworkService, 
        private usersService: UsersService
    ) {}

    ngOnInit () {
        this.getAllUsers ();
    }

    getAllUsers () {
        this.networkService
            .get(this.allUsersPath)
            .subscribe(res => {
                console.log(res.obj)
                this.responseUsers = res.obj.object;
            })
    }   

    stop (id) {
        this.currentUser = id;
    }
}