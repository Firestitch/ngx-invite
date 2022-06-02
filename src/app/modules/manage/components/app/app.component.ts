import {
  Component, Inject, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, ViewChild,
} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FsFormDirective } from '@firestitch/form';
import { FsMessage } from '@firestitch/message';
import { VerificationMethodType } from '../../../../enums/verification-method-type.enum';

import { tap } from 'rxjs/operators';
import { TwoFactorManageService } from '../../services';


@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  @ViewChild(FsFormDirective)
  public form: FsFormDirective;

  public twoFactorManageService: TwoFactorManageService;
  public mode: 'qr-code' | 'code-input' = 'qr-code';
  public accountId;
  public qrCodeUrl;
  public code;
  public default;
  public appType: 'google' | 'authy';

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _dialogRef: MatDialogRef<AppComponent>,
    private _cdRef: ChangeDetectorRef,
    private _message: FsMessage,
  ) {}

  public ngOnInit(): void {
    this.twoFactorManageService = this._data.twoFactorManageService;
    this.accountId = this._data.accountId;
    this.default = !this.twoFactorManageService.hasVerificationMethods;
  }

  public appTypeGoogle(): void {
    this.appTypeSelect('google');
  }

  public appTypeAuthy(): void {
    this.appTypeSelect('authy');
  }

  public appTypeSelect(appType): void {
    this.appType = appType;
    this.twoFactorManageService.verificationMethodCreate({
      type: VerificationMethodType.App,
      default: this.default,
    })
      .subscribe((response) => {
        this.qrCodeUrl = response.qrCodeUrl;
        this._cdRef.markForCheck();
      });
  }

  public codeCompleted(): void {
    this.form.triggerSubmit();
  }

  public codeChanged(code): void {
    this.code = code;
    this.form.dirty();
  }

  public next(): void {
    this.mode = 'code-input';
  }

  public verify = () => {
    return this.twoFactorManageService.verificationMethodVerify(this.code)
      .pipe(
        tap(() => {
          this._message.success('Created app authenticator verification method');
          this._dialogRef.close(true);
        }),
      );
  };

}
