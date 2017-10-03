import { IAppState } from '../../store/index';
import { UsersAction } from '../../store/actions/users.action';
import { StartModalComponent } from '../modal/startModal.component';
import { Component, ViewChild } from '@angular/core';
import { NgRedux } from 'ng2-redux';

@Component({
    selector: 'all-users-list',
    templateUrl: 'allUsers.component.html'
})
export class AllUsersComponent {
    private responseUsers;
    
    constructor (
        private usrsAction: UsersAction,
        private ngRedux: NgRedux<IAppState>
    ) {}

    ngOnInit () {
        this.getAllUsers ();
    }

    getAllUsers () {
        this.usrsAction.getAllUsers()
        this.ngRedux
            .select(state => state.allUsers)
            .subscribe(data => {
                console.log(data)
                this.responseUsers = data.allUsers
            })
            
    }   
}