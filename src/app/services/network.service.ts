import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { ToastService } from '../typescripts/pro/alerts/index';

@Injectable()
export class NetworkService {

    constructor(private http: Http,
        private toastService: ToastService) { }

    get(url, authenticated = false) {
        const options = { withCredentials: true };

        return this.http.get(`${environment.backEndBaseUrl}${url}`, options)
            .map(this.extractData.bind(this))
            .catch(err => {
                console.error(err)

                this.toastService.error("Нещо се обърка!");
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
        const options = { withCredentials: true };
        const data = new FormData();
        let { name, lastName, email } = body;
        data.append('dto', new Blob([JSON.stringify({ name, lastName, email })], { type: 'application/json' }));
        data.append('file', body.photo);
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