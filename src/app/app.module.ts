import { ListItemComponent } from './components/listItems/listItem.component';
import { UsersService } from './services/users.service';
import { StartModalComponent } from './components/modal/startModal.component';
import { AllUsersComponent } from './components/usersList/allUsers.component';
import { RoutesModule } from './routes.module';
import { LoginComponent } from './components/login/login.component';
import { NetworkService } from './services/network.service';
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

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MDBSpinningPreloader } from './typescripts/pro/';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AllUsersComponent,
    StartModalComponent,
    ListItemComponent
  ],
  imports: [
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
    UsersService
  ],
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
