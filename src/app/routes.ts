import { Routes } from '@angular/router'
import { AuthGuard } from './auth/auth.guard';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserDetailComponent } from './home/user-detail/user-detail.component';
import { HostInformationComponent } from './home/host-information/host-information.component';
import { GroupInformationComponent } from './home/group-information/group-information.component';
import { ItemsHostInformationComponent } from './home/items-host-information/items-host-information.component';
import { ItemHistoryComponent } from './home/item-history/item-history.component';
import { ItemGraphicComponent } from './home/item-graphic/item-graphic.component';

export const appRoutes: Routes = [
    { 
        path: 'home', component: HomeComponent, 
        children: [
            { path: '', redirectTo: 'user-detail', pathMatch: 'full' },
            { path: 'user-detail', component: UserDetailComponent },
            { path: 'host-information', component: HostInformationComponent },
            { path: 'group-information', component: GroupInformationComponent },
            { path: 'items-host-information/:hostid', component: ItemsHostInformationComponent },
            { path: 'item-history/:itemid/:hostid', component: ItemHistoryComponent },
            { path: 'item-graphic/:itemid/:hostid', component: ItemGraphicComponent }
        ],
        canActivate:[AuthGuard] 
    },
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    { path : '', redirectTo:'/login', pathMatch : 'full'}
    
];