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

import { CodeInputModule } from 'angular-code-input';

import { Fs2FAVerificationComponent } from './components/2fa-verification/2fa-verification.component';
import { Fs2FAVerificationCodeComponent } from './components/2fa-verification-code/2fa-verification-code.component';
import { Fs2FaVerificationMethodsComponent } from './components/2fa-verification-methods/2fa-verification-methods.component';


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
    Fs2FAVerificationComponent,
    Fs2FAVerificationCodeComponent,
    Fs2FaVerificationMethodsComponent,
  ],
  exports: [
    Fs2FAVerificationComponent,
  ],
  providers: [],
})
export class Fs2FaModule {}
