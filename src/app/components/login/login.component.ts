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

    ngOnInit() { 
        this.authService
            .user
            .subscribe(data => {
                if (data["status"]) {
                    this.router.navigateByUrl('users')
                } 
            })
    }

    login () {
        this.authService
            .login(this.user)
    }
}