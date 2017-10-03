import { UsersService } from './services/users.service';
import { UsersAction } from './store/actions/users.action';
import { LoginActions } from './store/actions/login.actions';
import { RoutesModule } from './routes.module';
import { NetworkService } from './services/network.service';
import { LoginComponent } from './components/login/login.component';
import { AllUsersComponent } from './components/usersList/allUsers.component';
import { StartModalComponent } from './components/modal/startModal.component';
import { ListItemComponent } from './components/listItems/listItem.component';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MDBBootstrapModule } from './typescripts/free';
import { MDBBootstrapModulePro } from './typescripts/pro';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBSpinningPreloader } from './typescripts/pro/';

import { Router } from '@angular/router'

import { NgReduxModule, NgRedux } from 'ng2-redux';
import { store, IAppState } from './store'

import { config } from './config'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AllUsersComponent,
    StartModalComponent,
    ListItemComponent
  ],
  imports: [
    NgReduxModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    MDBBootstrapModulePro.forRoot(),
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    }),
    RoutesModule
  ],
  providers: [
    MDBSpinningPreloader,
    AuthService,
    NetworkService,
    LoginActions,
    UsersAction,
    UsersService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private authService: AuthService) {

    this.ngRedux.provideStore(store);

    config(ngRedux, router, authService);
  }
}
