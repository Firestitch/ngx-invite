import { NgModule } from '@angular/core';

import { FsCodeInputModule } from '@firestitch/code-input';

import { CodeInputComponent } from './components/code-input';


@NgModule({
  imports: [
    FsCodeInputModule,
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
