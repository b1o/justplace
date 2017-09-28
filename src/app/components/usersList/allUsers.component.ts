import { NetworkService } from '../../services/network.service';
import { Component } from '@angular/core';

@Component({
    selector: 'all-users-list',
    templateUrl: 'allUsers.component.html'
})
export class AllUsersComponent {
    private allUsersPath = 'users';
    private timerPath = 'timer/';
    private responseUsers;
    private btn = "start";

    constructor (private networkService: NetworkService) {}

    ngOnInit () {
        this.getAllUsers ();
    }

    getAllUsers () {
        this.networkService
            .get(this.allUsersPath)
            .subscribe(res => {
                console.log(res.obj)
                this.responseUsers = res.obj;
            })
    }

    startStop (id) {
        console.log(id)
        this.networkService
            .post(`${this.timerPath}${id}`, id)
            .subscribe(res => {
                console.log(res)
            })
    }
}