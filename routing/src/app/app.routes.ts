import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "users",
    component: UserComponent,
    children: [
      {
        path: 'list', 
        component: UserListComponent, 
      },
      {
        path: 'detail',
        component: UserDetailComponent,
      },
    ],
  },
  {
    path: "settings",
    component: SettingsComponent
  },
  {
    path: "",
    redirectTo: '/dashboard', 
    pathMatch: 'full'
  },
  {
    path: "**",
    component: NotFoundComponent
  },
];
