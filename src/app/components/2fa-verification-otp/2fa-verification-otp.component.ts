import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

import { FsFormDirective } from '@firestitch/form';


@Component({
  selector: 'fs-2fa-verification-otp',
  templateUrl: './2fa-verification-otp.component.html',
  styleUrls: [
    './2fa-verification-otp.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Fs2FAVerificationOTPComponent {

  @Output()
  public codeChange = new EventEmitter<string>();

  constructor(
    public form: FsFormDirective,
  ) {}

  public codeChanged(event: string): void {
    this.codeChange.emit(event);
    this.form.dirty();
  }

  public codeCompleted(): void {
    this.form.triggerSubmit();
  }
}
