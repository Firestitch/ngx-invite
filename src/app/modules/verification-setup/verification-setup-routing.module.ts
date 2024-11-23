import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailComponent, VerifyComponent } from './views';


const routes: Routes = [
  { path: '', component: EmailComponent, pathMatch: 'full' },
  { path: 'verify', component: VerifyComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class VerificationSetupRoutingModule { }
