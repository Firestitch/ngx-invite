import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InviteResolve } from './resolvers';
import { InviteComponent, SigninComponent, SignupComponent } from './views';
import { ErrorComponent } from './views/error';

const routes: Routes = [
  
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: ':guid',
    resolve: {
      invite: InviteResolve,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: InviteComponent,
      },
      {
        path: 'signin',
        component: SigninComponent,
        loadChildren: () => import('@firestitch/signin').then((m) => m.FsSigninRouteModule),
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/signin' },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [InviteResolve],
})
export class InviteRoutingModule { }
