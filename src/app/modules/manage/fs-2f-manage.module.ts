import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FsListModule } from '@firestitch/list';
import { FsDialogModule } from '@firestitch/dialog';
import { FsFormModule } from '@firestitch/form';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FsLabelModule } from '@firestitch/label';
import { FsPhoneModule } from '@firestitch/phone';
import { FsCountryModule } from '@firestitch/country';

import { QrCodeModule } from 'ng-qrcode';


import { CodeInputModule } from '../code-input';
import { Fs2faManageComponent } from './components/2fa-manage';
import { ManageMethodsComponent } from './components/manage-methods';
import { NumbersComponent } from './components/numbers';
import { AppComponent } from './components/app';
import { EmailComponent } from './components/email';
import { NumberComponent } from './components/number';
import { EmailsComponent } from './components/emails';
import { ResendModule } from '../resend/resend.module';
import { DefautledModule } from '../defaulted/defaulted.module';
import { Fs2faVerificationModule } from '../verification/fs-2fa-verification.module';
import { Fs2faVerificationMethodsModule } from '../verification-methods';


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

    CodeInputModule,

    QrCodeModule,
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
