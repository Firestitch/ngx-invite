import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class Fs2FaModule {
  static forRoot(): ModuleWithProviders<Fs2FaModule> {
    return {
      ngModule: Fs2FaModule,
      // providers: [FsComponentService]
    };
  }
}
