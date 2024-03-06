import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FsCodeInputModule } from '@firestitch/code-input';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CodeInputComponent } from './components/code-input';


@NgModule({
  imports: [
    FormsModule,

    MatFormFieldModule,
    MatInputModule,

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
