import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ResendComponent } from './components/resend';


@NgModule({
  imports: [
    CommonModule,

    MatProgressSpinnerModule,
  ],
  declarations: [
    ResendComponent,
  ],
  exports: [
    ResendComponent,
  ],
})
export class ResendModule {
}
