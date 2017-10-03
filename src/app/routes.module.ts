import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AllUsersComponent } from './components/usersList/allUsers.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'users', component: AllUsersComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutesModule { }