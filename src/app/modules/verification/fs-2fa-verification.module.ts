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
import { ResendModule } from '../resend/resend.module';
import { Fs2faVerificationResendDirective } from './directives';
import { FsPhoneModule } from '@firestitch/phone';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,

    FsFormModule,
    FsRadioGroupModule,
    FsDialogModule,
    FsSkeletonModule,
    FsPhoneModule,
    FsSkeletonModule,

    ResendModule,
    CodeInputModule,
  ],
  declarations: [
    Fs2faVerificationComponent,
    Fs2faVerificationCodeComponent,
    Fs2faVerificationMethodsComponent,
    Fs2faVerificationResendDirective,
  ],
  exports: [
    Fs2faVerificationComponent,
    Fs2faVerificationResendDirective,
  ],
  providers: [],
})
export class Fs2faVerificationModule {}
