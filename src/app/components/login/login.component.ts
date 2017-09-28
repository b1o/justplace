import { Router } from '@angular/router';
import { LoginModel } from './login.model';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    private user: LoginModel = new LoginModel()

    constructor (
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() { }

    login () {
        console.log(this.user)
        this.authService
            .login(this.user)
            .subscribe(res => {
                if (res.obj === true) {
                    this.router.navigateByUrl('users')
                }
            })
    }
}