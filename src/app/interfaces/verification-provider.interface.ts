import { Observable } from 'rxjs';

import { IFsVerificationMethod } from './verification-method.interface';


export interface IFsVerificationProvider {
  verify(code: any, trustedDevice: boolean): Observable<unknown>;
  resend(): Observable<void>;
  methods(): Observable<IFsVerificationMethod[]>;
  updateVerificationMethod(id: number): Observable<IFsVerificationMethod>
}
