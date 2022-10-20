import {
  Component, Inject, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild,
} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FsMessage } from '@firestitch/message';
import { FsFormDirective } from '@firestitch/form';

import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TwoFactorManageService } from '../../services';
import { VerificationMethodType } from '../../../../enums/verification-method-type.enum';


@Component({
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberComponent {

  @ViewChild(FsFormDirective, { static: false })
  public form: FsFormDirective;

  public phone;
  public code;
  public default;
  public trustDevice = true;
  public verificationMethod = null;
  public defaultCountry;
  public twoFactorManageService: TwoFactorManageService;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _dialogRef: MatDialogRef<NumberComponent>,
    private _cdRef: ChangeDetectorRef,
    private _message: FsMessage,
  ) {
    this.twoFactorManageService = _data.twoFactorManageService;
    this.defaultCountry = _data.defaultCountry;
    this.default = !this.twoFactorManageService.hasVerificationMethods;
  }

  public resend = (): Observable<void> => {
    return this.twoFactorManageService.verificationMethodResend()
      .pipe(
        tap(() => {
          this._message.success('Resent verification code');
        }),
      );
  }

  public submit = () => {
    return of(true)
      .pipe(
        switchMap(() => {
          return this.verificationMethod ?
            this.twoFactorManageService.verificationMethodVerify$(this.code, this.trustDevice)
              .pipe(
                tap((verificationMethod) => {
                  this._message.success('Created text message verification method');
                  this._dialogRef.close(verificationMethod);
                }),
              ) :
            this.twoFactorManageService.verificationMethodCreate$({
              type: VerificationMethodType.Sms,
              phoneNumber: this.phone.number,
              phoneCode: this.phone.countryCode,
              phoneCountry: this.phone.isoCode,
              default: this.default,
            })
            .pipe(
              tap((verificationMethod) => {
                this.verificationMethod = verificationMethod;
                this.form.clear();
                this._cdRef.markForCheck();
              }),
            );
        }),
      );
  };

  public codeCompleted(): void {
    if(!this.form.submitting) {
      this.form.triggerSubmit();
    }
  }

  public codeChanged(code): void {
    this.code = code;
  }

}
