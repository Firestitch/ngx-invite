import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FsCountryModule } from '@firestitch/country';
import { FsDialogModule } from '@firestitch/dialog';
import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
import { FsListModule } from '@firestitch/list';
import { FsPhoneModule } from '@firestitch/phone';
import { FsQrcodeModule } from '@firestitch/qrcode';
import { FsSkeletonModule } from '@firestitch/skeleton';


import { CodeInputModule } from '../code-input';
import { DefautledModule } from '../defaulted/defaulted.module';
import { ResendModule } from '../resend/resend.module';
import { Fs2faVerificationMethodsModule } from '../verification-methods';
import { Fs2faVerificationModule } from '../verification/fs-2fa-verification.module';

import { Fs2faManageComponent } from './components/2fa-manage';
import { AppComponent } from './components/app';
import { EmailComponent } from './components/email';
import { EmailsComponent } from './components/emails';
import { ManageMethodsComponent } from './components/manage-methods';
import { NumberComponent } from './components/number';
import { NumbersComponent } from './components/numbers';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,

    FsDialogModule,
    FsListModule,
    FsFormModule,
    FsLabelModule,
    FsPhoneModule,
    FsSkeletonModule,
    FsCountryModule,
    FsQrcodeModule,

    CodeInputModule,

    ResendModule,
    DefautledModule,
    Fs2faVerificationModule,
    Fs2faVerificationMethodsModule,
  ],
  declarations: [
    Fs2faManageComponent,
    ManageMethodsComponent,
    NumbersComponent,
    AppComponent,
    EmailComponent,
    NumberComponent,
    EmailsComponent,
  ],
  exports: [Fs2faManageComponent],
})
export class Fs2faManageModule { }
