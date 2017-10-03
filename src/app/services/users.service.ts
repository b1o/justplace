import { NetworkService } from './network.service';
import { Injectable } from '@angular/core';


@Injectable()
export class UsersService {

    constructor(private networkService: NetworkService) { }

    getAllUsers () {
        let url = 'users'

        return this.networkService
            .get(url)
    }

    start (userInfo) {
        let id = userInfo.user.id;
        let url = 'timer/' + id;

        return this.networkService
            .post(url, userInfo)
    }

    stop (id) {
        let url = `timer/${id}/stop`;

        return this.networkService
            .post(url, {})
    }
}