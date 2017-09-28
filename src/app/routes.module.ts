import { AllUsersComponent } from './components/usersList/allUsers.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'users', component: AllUsersComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutesModule {}