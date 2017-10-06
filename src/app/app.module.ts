import 'moment/locale/bg';

import { AgmCoreModule } from '@agm/core';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { PaginationComponent } from './components/common/pagination/pagination.component';
import { PhotoCaptureComponent } from './components/common/photo-capture/photo-capture.component';
import { AppSidenavComponent } from './components/common/sidenav/sidenav.component';
import { FancyTimerComponent } from './components/common/timer/fancy-timer.component';
import { VisitGraphComponent } from './components/common/visit-graph/visit-graph.component';
import { ListItemComponent } from './components/listItems/listItem.component';
import { LoginComponent } from './components/login/login.component';
import { StartModalComponent } from './components/modal/startModal.component';
import { StopModalComponent } from './components/modal/stopModal.component';
import { RegisterUserComponent } from './components/users/registerUser/registerUser.component';
import { UserSessionsHistoryComponent } from './components/users/sessions-history/sessions-history.component';
import { UserSearchComponent } from './components/users/user-search/user-search.component';
import { UserProfileComponent } from './components/users/userProfile/userProfile.component';
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
    StopModalComponent,
    ListItemComponent,
    NavbarComponent,
    RegisterUserComponent,
    PhotoCaptureComponent,
    AppSidenavComponent,
    UserProfileComponent,
    VisitGraphComponent,
    PaginationComponent,
    FancyTimerComponent,
    UserSessionsHistoryComponent,
    UserSearchComponent
  ],
  imports: [
    NgReduxModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    MDBBootstrapModulePro.forRoot(),
    NgReduxRouterModule,
    NgbModule.forRoot(),
    MomentModule,
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
    private authService: AuthService,
    private ngReduxRouter: NgReduxRouter, private layoutActions: LayoutActions) {

    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (this.ngRedux.getState().layout.sidenavOpen) {
            this.layoutActions.closeSidenav()
          }
        }
      })


    this.ngRedux.provideStore(store);
    this.ngReduxRouter.initialize()
    config(ngRedux, router, authService);
  }
}
