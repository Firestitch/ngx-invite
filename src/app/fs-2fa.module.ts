import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatIconModule } from '@angular/material/icon';

import { FsListModule } from '@firestitch/list';
import { FsDateModule } from '@firestitch/date';
import { FsCountryModule } from '@firestitch/country';
import { FsDeviceModule } from '@firestitch/device';

import { FsTrustedCurrentDeviceComponent } from './components/trusted-current-device/trusted-current-device.component';
import { FsTrustedDevicesComponent } from './components/trusted-devices/trusted-devices.component';

import { FsBadgeModule } from '@firestitch/badge';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,

    MatIconModule,
    MatTooltipModule,

    FsListModule,
    FsDateModule,
    FsCountryModule,
    FsDeviceModule,
    FsBadgeModule,
  ],
  exports: [
    FsTrustedDevicesComponent,
    FsTrustedCurrentDeviceComponent,
  ],
  declarations: [
    FsTrustedDevicesComponent,
    FsTrustedCurrentDeviceComponent,
  ],
})
export class Fs2FaModule {
  static forRoot(): ModuleWithProviders<Fs2FaModule> {
    return {
      ngModule: Fs2FaModule,
    };
  }
}
