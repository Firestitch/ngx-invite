import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IFsVerificationMethod } from '../../interfaces/verification-method.interface';


@Component({
  selector: 'fs-2fa-verification',
  templateUrl: './2fa-verification.component.html',
  styleUrls: [
    './2fa-verification.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Fs2FAVerificationComponent {

  @Input()
  public method: IFsVerificationMethod;

  @Output()
  public verified = new EventEmitter<unknown>();

  @Output()
  public backToSignIn = new EventEmitter<void>();

  private _view: 'code' | 'methods' = 'code';

  constructor() {}

  public get view(): 'code' | 'methods' {
    return this._view;
  }

  public switchVerificationMethod(method: 'code' | 'methods'): void {
    this._view = method;
  }

  public setActiveMethod(method: IFsVerificationMethod): void {
    this.method = method;
    this.switchVerificationMethod('code');
  }

  public cancel(): void {
    this.switchVerificationMethod('code');
  }

  public toSignIn(): void {
    this.backToSignIn.emit();
  }

}
