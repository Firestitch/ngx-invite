import { Component, ViewChild } from '@angular/core';
import { Fs2faVerificationComponent, FsVerificationMethodType, IFsVerificationMethod } from '@firestitch/2fa';
import { FsMessage } from '@firestitch/message';


@Component({
  selector: 'app-verification',
  styleUrls: ['./verification.component.scss'],
  templateUrl: './verification.component.html',
})
export class VerificationComponent {

  @ViewChild(Fs2faVerificationComponent)
  public verificationComponent: Fs2faVerificationComponent;

  constructor(
    private _message: FsMessage,
  ) {}

  public method: IFsVerificationMethod = {
    id: 4,
    type: FsVerificationMethodType.Sms,
    phoneCode: 1,
    phoneCountry: 'CA',
    phoneNumber: '(416) *** - **47',
    default: true,
  }

  public showVerificationMethods(): void {
    this.verificationComponent.showVerificationMethods();
  }

  public verified() {
    this._message.success('2FA successful');
  };
}
