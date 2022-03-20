import { NgModule } from '@angular/core';

import { CodeInputModule as AngularCodeInputModule } from 'angular-code-input';

import { CodeInputComponent } from './components/code-input';


@NgModule({
  imports: [
    AngularCodeInputModule,
  ],
  declarations: [
    CodeInputComponent,
  ],
  exports: [
    CodeInputComponent,
  ],
})
export class CodeInputModule {
}
