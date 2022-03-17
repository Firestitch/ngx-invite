import { Component } from '@angular/core';
import { FsVerificationMethodType, IFsVerificationMethod } from '@firestitch/2fa';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
})
export class VerificationComponent {
  public method: IFsVerificationMethod = {
    id: 4,
    type: FsVerificationMethodType.Sms,
    phoneCode: 1,
    phoneCountry: 'CA',
    phoneNumber: '(416) *** - **47',
    default: true,
  }
}
