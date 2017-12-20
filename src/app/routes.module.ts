import { SettingsComponent } from './components/common/settings/settings.component';
import { ActiveUsersComponent } from './components/users/activeUsers/activeUsers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/users/registerUser/registerUser.component';
import { UserProfileComponent } from './components/users/userProfile/userProfile.component';
import { AllUsersComponent } from './components/usersList/allUsers.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'users', component: AllUsersComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'users/active', component: ActiveUsersComponent },
    { path: 'users/new', component: RegisterUserComponent },
    { path: 'users/:id', component: UserProfileComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class RoutesModule { }