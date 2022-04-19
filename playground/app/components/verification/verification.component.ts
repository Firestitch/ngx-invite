import { Component, ViewChild } from '@angular/core';
import { Fs2faVerificationComponent, FsVerificationMethodType, IFsVerificationMethod } from '@firestitch/2fa';
import { FsMessage } from '@firestitch/message';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';


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

  public verify = (): Observable<any> => {
    return of({ code: this.verificationComponent.code, trustedDevice: this.verificationComponent.trustedDevice })
      .pipe(
        delay(1000),
        tap(() => {
          this._message.success('2FA successful');
        })
      );
  }

  public resend = (): Observable<void> => {
    return of(null)
      .pipe(
        delay(100),
      );
  }

  public getVerificationMethods = (): Observable<IFsVerificationMethod[]> => {
    return of(this.methods)
    .pipe(
      delay(100),
    );
  }

  public selectVerificationMethod = (verificationMethod: IFsVerificationMethod): Observable<IFsVerificationMethod> => {
    console.log('selectVerificationMethod', verificationMethod.id);
    const method = this.methods.find((method) => method.id === verificationMethod.id);

    return of(method)
      .pipe(
        delay(100),
      );
  }

  public methods = [
    {
      id: 1,
      type: FsVerificationMethodType.Sms,
      phoneCode: 1,
      phoneCountry: 'CA',
      phoneNumber: '********32',
      default: false,
    },
    {
      id: 2,
      type: FsVerificationMethodType.Email,
      email: 'e******@example.com',
      default: false,
    },
    {
      id: 3,
      type: FsVerificationMethodType.Email,
      email: 'e******@example.com',
      default: false,
    },
    {
      id: 4,
      type: FsVerificationMethodType.Sms,
      phoneCode: 1,
      phoneCountry: 'CA',
      phoneNumber: '********47',
      default: true,
    },
    {
      id: 5,
      type: FsVerificationMethodType.App,
      default: false,
    },
  ];
  
}
