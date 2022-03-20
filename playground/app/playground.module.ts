import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { Fs2faVerificationModule, Fs2faManageModule } from '@firestitch/2fa';
import { FsLabelModule } from '@firestitch/label';
import { FsStoreModule } from '@firestitch/store';
import { FsFormModule } from '@firestitch/form';

import { ToastrModule } from 'ngx-toastr';

import { AppMaterialModule } from './material.module';
import {
  ExamplesComponent
} from './components';
import { AppComponent } from './app.component';
import { VerificationComponent } from './components/verification/verification.component';
import { FS_2FA_VERIFICATION_PROVIDER } from '../../src/app/tokens/verification.token';
import { VerificationService } from './services/verification.service';
import { ManageVerificationsComponent } from './components/manage-verifications/manage-verifications.component';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    Fs2faVerificationModule,
    Fs2faManageModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsLabelModule,
    FsStoreModule,
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    FsFormModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
    RouterModule.forRoot(routes),
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    VerificationComponent,
    ManageVerificationsComponent,
  ],
  providers: [
    {
      provide: FS_2FA_VERIFICATION_PROVIDER,
      useClass: VerificationService,
    },
  ],
})
export class PlaygroundModule {
}
