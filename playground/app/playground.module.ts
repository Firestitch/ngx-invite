import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { FsExampleModule } from '@firestitch/example';
import { FsFormModule } from '@firestitch/form';
import { FS_INVITE_CONFIG } from '@firestitch/invite';
import { FsLabelModule } from '@firestitch/label';
import { FsMessageModule } from '@firestitch/message';
import { FsStoreModule } from '@firestitch/store';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {
  ExamplesComponent,
} from './components';
import { AppMaterialModule } from './material.module';


const routes: Routes = [
  { path: '', redirectTo: 'invite', pathMatch: 'full' },
  //{ path: '', component: ExamplesComponent },
  { path: 'invite', loadChildren: () => import('../../src/app/modules/invite').then((m) => m.FsInviteModule) },
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsLabelModule,
    FsStoreModule,
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    FsFormModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
  ],
  providers: [
    { provide: FS_INVITE_CONFIG, useValue: { apiUrl: 'http://localhost:3000' } },
  ],
})
export class PlaygroundModule {
}
