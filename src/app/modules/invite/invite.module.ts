import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FsBadgeModule } from '@firestitch/badge';
import { FsFormModule } from '@firestitch/form';
import { FsPasswordModule } from '@firestitch/password';
import { FsSigninModule, SIGNIN_CONFIG } from '@firestitch/signin';
import { FsSkeletonModule } from '@firestitch/skeleton';

import { InviteData } from './data';
import { signinConfig } from './helpers';
import { InviteRoutingModule } from './invite-routing.module';
import { InviteService } from './services';
import { InviteComponent, SigninComponent, SignupComponent } from './views';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

    FsFormModule,
    FsBadgeModule,
    FsPasswordModule,
    FsSkeletonModule,
    FsSigninModule,

    InviteRoutingModule,
  ],
  declarations: [
    InviteComponent,
    SigninComponent,
    SignupComponent,
  ],
  providers: [
    InviteService,
    InviteData,
    {
      provide: SIGNIN_CONFIG,
      useFactory: signinConfig,
      deps: [Router, InviteData, InviteService],
    },
  ],
})
export class FsInviteModule { }
