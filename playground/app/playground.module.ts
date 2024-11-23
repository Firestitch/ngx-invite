import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { Fs2faManageModule, Fs2faVerificationMethodsModule, Fs2faVerificationModule } from '@firestitch/2fa';
import { FsExampleModule } from '@firestitch/example';
import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
import { FsMessageModule } from '@firestitch/message';
import { FsPhoneModule } from '@firestitch/phone';
import { FsStoreModule } from '@firestitch/store';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import {
  ExamplesComponent,
} from './components';
import { ManageVerificationsComponent } from './components/manage-verifications/manage-verifications.component';
import { VerificationMethodsComponent } from './components/verification-methods/manage-verifications.component';
import { VerificationComponent } from './components/verification/verification.component';
import { AppMaterialModule } from './material.module';


const routes: Routes = [
  { path: '', component: ExamplesComponent },
  { path: 'verification', loadChildren: () => import('../../src/app/modules/verification-setup').then((m) => m.FsVerificationSetupModule) },
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    Fs2faVerificationModule,
    Fs2faManageModule,
    Fs2faVerificationMethodsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsLabelModule,
    FsStoreModule,
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    FsFormModule.forRoot(),
    FsPhoneModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
    RouterModule.forRoot(routes),
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    VerificationComponent,
    ManageVerificationsComponent,
    VerificationMethodsComponent,
  ],
})
export class PlaygroundModule {
}
