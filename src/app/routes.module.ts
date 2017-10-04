import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/users/registerUser/registerUser.component';
import { UserProfileComponent } from './components/users/userProfile/userProfile.component';
import { AllUsersComponent } from './components/usersList/allUsers.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'users', component: AllUsersComponent },
    { path: 'users/new', component: RegisterUserComponent },
    { path: 'users/:id', component: UserProfileComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutesModule { }