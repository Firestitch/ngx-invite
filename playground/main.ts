import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { FS_INVITE_CONFIG } from '@firestitch/invite';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FsLabelModule } from '@firestitch/label';
import { FsStoreModule } from '@firestitch/store';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsFormModule } from '@firestitch/form';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';

const routes: Routes = [
    { path: '', redirectTo: 'invite', pathMatch: 'full' },
    //{ path: '', component: ExamplesComponent },
    { path: 'invite', loadChildren: () => import("../src/app/modules/invite").then((m) => m.FsInviteModule) },
];


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, FsLabelModule, FsStoreModule, FsExampleModule.forRoot(), FsMessageModule.forRoot(), FsFormModule.forRoot()),
        { provide: FS_INVITE_CONFIG, useValue: { apiUrl: 'http://localhost:3000' } },
        provideAnimations(),
        provideRouter(routes),
    ]
})
  .catch(err => console.error(err));

