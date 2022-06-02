import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


import { FsListModule } from '@firestitch/list';
import { FsPhoneModule } from '@firestitch/phone';
import { FsCountryModule } from '@firestitch/country';

import { VerificationMethodsComponent } from './components/verification-methods/verification-methods.component';
import { DefautledModule } from '../defaulted/defaulted.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatIconModule,

    FsListModule,
    FsPhoneModule,
    FsCountryModule,

    DefautledModule,
  ],
  declarations: [
    VerificationMethodsComponent,
  ],
  exports: [VerificationMethodsComponent],
})
export class Fs2faVerificationMethodsModule { }
