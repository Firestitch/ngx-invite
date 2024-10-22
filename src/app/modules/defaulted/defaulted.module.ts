import { NgModule } from '@angular/core';

import { FsChipModule } from '@firestitch/chip';

import { DefaultedComponent } from './components/defaulted';


@NgModule({
  declarations: [
    DefaultedComponent,
  ],
  imports: [
    FsChipModule,
  ],
  exports: [DefaultedComponent],
})
export class DefautledModule { }
