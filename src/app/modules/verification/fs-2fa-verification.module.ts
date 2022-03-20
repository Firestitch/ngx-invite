import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FsFormModule } from '@firestitch/form';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FsRadioGroupModule } from '@firestitch/radiogroup';
import { FsDialogModule } from '@firestitch/dialog';

import { Fs2faVerificationComponent } from './components/2fa-verification/2fa-verification.component';
import { Fs2faVerificationCodeComponent } from './components/2fa-verification-code/2fa-verification-code.component';
import { Fs2faVerificationMethodsComponent } from './components/2fa-verification-methods/2fa-verification-methods.component';

import { CodeInputModule } from '../code-input';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

    FsFormModule,
    FsRadioGroupModule,
    FsDialogModule,

    CodeInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    FsSkeletonModule,
    FsSkeletonModule,
    MatIconModule,
    MatRadioModule,
  ],
  declarations: [
    Fs2faVerificationComponent,
    Fs2faVerificationCodeComponent,
    Fs2faVerificationMethodsComponent,
  ],
  exports: [
    Fs2faVerificationComponent,
  ],
  providers: [],
})
export class Fs2faVerificationModule {}
