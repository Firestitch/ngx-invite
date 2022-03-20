import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { FsVerificationMethodType, IFsVerificationMethod } from '@firestitch/2fa';

import { IFsVerificationProvider } from '../../../src/app/interfaces/verification-provider.interface';

const methods = [
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

@Injectable()
export class VerificationService implements IFsVerificationProvider {

  public methods(): Observable<IFsVerificationMethod[]> {
    return of(methods).pipe(
      delay(100),
    );
  }

  public verify(code: any, trustedDevice: boolean): Observable<void> {
    console.log('verify', code, trustedDevice);
    return of(null)
      .pipe(
        delay(100),
      );
  }

  public resend(): Observable<void> {
    return of(null)
      .pipe(
        delay(100),
      );
  }

  public updateVerificationMethod(id: number): Observable<IFsVerificationMethod> {
    console.log('updateVerificationMethod', id);
    const method = methods.find((method) => method.id === id);

    return of(method)
      .pipe(
        delay(100),
      );
  }

}
