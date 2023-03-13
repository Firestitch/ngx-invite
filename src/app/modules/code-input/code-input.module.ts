import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FsCodeInputModule } from '@firestitch/code-input';

import { CodeInputComponent } from './components/code-input';


@NgModule({
  imports: [
    FormsModule,
    
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
