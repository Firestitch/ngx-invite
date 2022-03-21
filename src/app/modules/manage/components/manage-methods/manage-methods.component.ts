import {
  Component, Inject, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy,
} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';

import { NumbersComponent } from '../numbers';
import { EmailsComponent } from '../emails';
import { TwoFactorManageService } from '../../services';
import { FsVerificationMethodType } from '../../../../enums/verification-method-type.enum';
import { FsMessage } from '@firestitch/message';


@Component({
  templateUrl: './manage-methods.component.html',
  styleUrls: ['./manage-methods.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageMethodsComponent implements OnInit, OnDestroy {

  public twoFactorManageService: TwoFactorManageService;
  public verificationMethods;

  private _destroy$ = new Subject();
  private _defaultCountry: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _cdRef: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _message: FsMessage,
  ) {}

  public ngOnInit(): void {
    this._defaultCountry = this._data.defaultCountry;
    this.twoFactorManageService = this._data.twoFactorManageService;

    this.twoFactorManageService.verificationMethods$
      .subscribe((verificationMethods) => {
        this.verificationMethods = verificationMethods;
        this._cdRef.markForCheck();
      });
  }

  public get defaultSms(): boolean {
    return this.twoFactorManageService.smsVerificationMethods
    .some((verificationMethod) => {
      return verificationMethod.default;
    });
  }

  public get defaultApp(): boolean {
    return this.twoFactorManageService.appVerificationMethods
    .some((verificationMethod) => {
      return verificationMethod.default;
    });
  }

  public get defaultEmail(): boolean {
    return this.twoFactorManageService.emailVerificationMethods
    .some((verificationMethod) => {
      return verificationMethod.default;
    });
  }

  public get textHasVerificationMethod(): boolean {
    return this.twoFactorManageService.hasVerificationMethod(FsVerificationMethodType.Sms);
  }

  public get appHasVerificationMethod(): boolean {
    return this.twoFactorManageService.hasVerificationMethod(FsVerificationMethodType.App);
  }

  public get emailHasVerificationMethod(): boolean {
    return this.twoFactorManageService.hasVerificationMethod(FsVerificationMethodType.Email);
  }

  public textMessageManage(): void {
    this._dialog.open(NumbersComponent, {
      data: {
        twoFactorManageService: this.twoFactorManageService,
        defaultCountry: this._defaultCountry,
      },
    });
  }

  public textMessageAdd(): void {
    this.twoFactorManageService.addSms(this._defaultCountry)
      .subscribe();
  }

  public emailMessageManage(): void {
    this._dialog.open(EmailsComponent, {
      data: {
        twoFactorManageService: this.twoFactorManageService,
      },
    });
  }

  public emailMessageAdd(): void {
    this.twoFactorManageService.addEmail()
      .subscribe();
  }

  public appRemove(): void {
    this._message.success('Removed App Authenticator verification method');

    const verificationMethod = this.verificationMethods
      .find((_verificationMethod) => {
        return _verificationMethod.type === FsVerificationMethodType.App;
      });

    if(verificationMethod) {
      this.twoFactorManageService.verificationMethodDelete(verificationMethod)
        .subscribe(() => {
          this._cdRef.markForCheck();
        });
    }
  }

  public appAdd(): void {
    this.twoFactorManageService.addApp()
      .subscribe();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
