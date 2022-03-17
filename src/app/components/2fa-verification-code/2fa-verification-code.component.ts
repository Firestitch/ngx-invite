import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { IFsVerificationMethod } from '../../interfaces/verification-method.interface';


@Component({
  selector: 'fs-2fa-verification-code',
  templateUrl: './2fa-verification-code.component.html',
  styleUrls: [
    './2fa-verification-code.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgForm,
    },
  ],
})
export class Fs2FAVerificationSMSComponent {

  @Input()
  public method: IFsVerificationMethod;

  @Output()
  public codeChange = new EventEmitter<string>();

  public code: string;

  public codeChanged(): void {
    this.codeChange.emit(this.code);
  }

}
