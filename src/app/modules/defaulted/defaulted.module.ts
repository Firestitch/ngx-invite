import { NgModule } from '@angular/core';

import { DefaultedComponent } from './components/defaulted';


@NgModule({
  declarations: [
    DefaultedComponent,
  ],
  exports: [DefaultedComponent],
})
export class DefautledModule { }
