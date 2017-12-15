import { Router } from '@angular/router';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { ToastService } from '../typescripts/pro/alerts/index';

@Injectable()
export class NetworkService {

    constructor(
        private http: Http,
        private toastService: ToastService,
        private router: Router
    ) { }

    get(url, authenticated = false) {
        const options = { withCredentials: true };

        return this.http.get(`${environment.backEndBaseUrl}${url}`, options)
            .map(this.extractData.bind(this))
            .catch(err => {
                console.error(err)

                if (err.obj) {
                    if (err.obj === "You are not logged!") {
                        this.router.navigate(['/login']);
                        window.localStorage.clear();
                    } else {
                        this.toastService.error(err.obj);
                    }
                } else {
                    this.toastService.error("Нещо се обърка!");
                }
                return Observable.throw(err)
            })
    }

    post(url, body, file?) {
        const options = { withCredentials: true };

        return this.http.post(`${environment.backEndBaseUrl}${url}`, body, options)
            .map(this.extractData.bind(this))
            .catch(err => {
                console.error(err)

                if (err.obj) {
                    this.toastService.error(err.obj);
                } else {
                    this.toastService.error("Нещо се обърка!");
                }
                return Observable.throw(err)
            })
    }

    postWithFile(url, body) {
        const headers = new Headers();
        headers.append('enctype', 'UTF-8');
        headers.delete('Content-Type');

        const options = { withCredentials: true, headers: headers };
        const data = new FormData();
        let { name, lastName, email, pictureName } = body;
        data.append('dto', new Blob([JSON.stringify({ name, lastName, email, pictureName })], { type: 'application/json' }));
        if(body.photo){
            data.append('file', body.photo);
        }
        return this.http.post(`${environment.backEndBaseUrl}${url}`, data, options)
            .map(this.extractData.bind(this))
            .catch(err => {
                console.error(err)
                if (err.obj) {
                    this.toastService.error(err.obj);
                } else {
                    this.toastService.error("Нещо се обърка!");
                }
                return Observable.throw(err)
            })
    }


    extractData(response: Response) {
        let res = response.json();

        if (!res.status) {
            throw res
        }

        return res
    }
}