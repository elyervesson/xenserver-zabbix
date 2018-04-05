import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

// d3 import
import 'd3';
import 'nvd3';
import { NvD3Module } from 'ng2-nvd3';

import { AppComponent } from './app.component';
import { ZabbixService } from './shared/services/zabbix.service';
import { UserService } from './shared/services/user.service';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { appRoutes } from './routes';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserDetailComponent } from './home/user-detail/user-detail.component';
import { HostInformationComponent } from './home/host-information/host-information.component';
import { GroupInformationComponent } from './home/group-information/group-information.component';
import { ItemsHostInformationComponent } from './home/items-host-information/items-host-information.component';
import { ItemHistoryComponent } from './home/item-history/item-history.component';
import { ItemGraphicComponent } from './home/item-graphic/item-graphic.component';
import { EditUserDialogComponent } from './home/user-detail/edit-user-dialog/edit-user-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
    UserDetailComponent,
    HostInformationComponent,
    GroupInformationComponent,
    ItemsHostInformationComponent,
    ItemHistoryComponent,
    ItemGraphicComponent,

    // Dialog
    EditUserDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    // 3d import
    NvD3Module
  ],
  providers: [UserService, ZabbixService, AuthGuard, {provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
