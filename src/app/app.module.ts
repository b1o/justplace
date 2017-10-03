import { TimerComponent } from './components/common/timer/timer.component';
import { AgmCoreModule } from '@agm/core';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgRedux, NgReduxModule } from 'ng2-redux';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { ListItemComponent } from './components/listItems/listItem.component';
import { LoginComponent } from './components/login/login.component';
import { StartModalComponent } from './components/modal/startModal.component';
import { AllUsersComponent } from './components/usersList/allUsers.component';
import { config } from './config';
import { RoutesModule } from './routes.module';
import { AuthService } from './services/auth.service';
import { NetworkService } from './services/network.service';
import { UsersService } from './services/users.service';
import { IAppState, store } from './store';
import { LayoutActions } from './store/actions/layout.actions';
import { LoginActions } from './store/actions/login.actions';
import { UsersAction } from './store/actions/users.action';
import { MDBBootstrapModule } from './typescripts/free';
import { MDBBootstrapModulePro } from './typescripts/pro';
import { MDBSpinningPreloader } from './typescripts/pro/';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AllUsersComponent,
    StartModalComponent,
    ListItemComponent,
    NavbarComponent,
    TimerComponent
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
    UsersService,
    LayoutActions
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
