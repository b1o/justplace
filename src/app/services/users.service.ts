import { NetworkService } from './network.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { IUsersData } from '../interfaces/IUsersData'

@Injectable()
export class UsersService {
    public userData: Subject<IUsersData> = new Subject<IUsersData>();

    constructor(private networkService: NetworkService) { }

    

    stop (id) {
        let data = {
            description: '',
            userCount: '',
            userId: id
        };
        
        let url = 'timer/'+id+'/stop';
        
        this.networkService
            .post(url, {})
            .subscribe(data => {
                console.log(data)
                this.userData.next(data)
            })
    }
}