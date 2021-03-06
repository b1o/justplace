import { Injectable } from '@angular/core';
import { UserModel } from 'models/users/user.model';

import { NetworkService } from './network.service';


@Injectable()
export class UsersService {

    constructor(private networkService: NetworkService) { }

    getAllUsers(url) {
        return this.networkService
            .get(url)
    }

    getUserInfo(id: number) {
        const url = 'users/' + id;

        return this.networkService
            .get(url);
    }

    searchUser(term) {
        const searchUrl = 'users?name=';
        const data = {
            searchString: term.term
        };
        
        return this.networkService
            .get(`${searchUrl}${data.searchString}`);
    }

    getActiveUsers() {
        let url = 'users/active';
        
        return this.networkService
            .get(url);
    }

    start(userInfo) {
        let id = userInfo.user.id;
        let url = 'timer/' + id;

        return this.networkService
            .post(url, userInfo)
    }

    stop(id) {
        let url = `timer/${id}/stop`;

        return this.networkService
            .post(url, {})
    }

    pay(userId, sessionId) {
        let url = `users/${userId}/sessions/${sessionId}/pay`;

        return this.networkService
            .post(url, {})
    }

    registerUser(user: UserModel) {
        const url = 'users/new';

        console.log('from user service ', user)

        return this.networkService
            .postWithFile(url, user)
    }

    changePage(pageUrl) {
        return this.getAllUsers(pageUrl);
    }

    editUsers(user) {
        console.log(user)
        const data = {...user};
        data.pictureName = user.pictureName;
        const url = `/users/${user.id}`;

        return this.networkService.postWithFile(url, data);
    }
}