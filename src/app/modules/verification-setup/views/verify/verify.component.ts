import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { FsCookie } from '@firestitch/cookie';
import { FsMessage } from '@firestitch/message';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IFsVerificationMethod } from '../../../../interfaces';
import { Fs2faVerificationComponent } from '../../../verification/components/2fa-verification';
import { VerificationMethodData } from '../../data';


@Component({
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyComponent {

  @ViewChild(Fs2faVerificationComponent)
  public verification: Fs2faVerificationComponent;

  public code = null;
  public verificationMethod: IFsVerificationMethod;

  private _cookie = inject(FsCookie);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _message = inject(FsMessage);
  private _verificationMethodData = inject(VerificationMethodData);

  public codeChanged(code): void {
    this.code = code;
  }

  public verify = (): Observable<any> => {
    return this._verificationMethodData
      .verify(this.code, this.verification.trustDevice)
      .pipe(
        tap(() => {
          const redirect = this._route.snapshot.queryParams.redirect || '/';
          this._message.success('Two factor verification successfully setup');
          this._router.navigateByUrl(redirect);
          this._cookie.delete('Token-Force2fa');
        }),
      );
  };

  public resend = (): Observable<void> => {
    return this._verificationMethodData.resend();
  };

  public cancel() {
    this._router.navigateByUrl('/signin');
  }

}
