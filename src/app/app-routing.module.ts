import { NgModule, inject } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './users/components/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './log/home/home.component';

//! IMPOSTARE LAZY MODULES + GUARD DEI COMPONENTIN IN USERS FOLDER
//? COMPONENTI CHILD??

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  //{ path: 'home', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    //canActivate: [AuthGuard],
    /*canActivate: [() => inject(AuthGuard).canActivate()],*/
         loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),

  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
