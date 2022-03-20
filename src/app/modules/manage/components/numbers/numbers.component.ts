import {
  Component, Inject, ChangeDetectionStrategy,
} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FsMessage } from '@firestitch/message';
import { FsVerificationMethodType } from '../../../../enums/verification-method-type.enum';
import { TwoFactorManageService } from '../../services';


@Component({
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumbersComponent {

  public defaultCountry;
  public twoFactorManageService: TwoFactorManageService;
  public FsVerificationMethodType = FsVerificationMethodType;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,   
    private _dialogRef: MatDialogRef<NumbersComponent>,
    private _message: FsMessage,
  ) {
    this.twoFactorManageService = _data.twoFactorManageService;
    this.defaultCountry = _data.defaultCountry;
  }

  public add(): void {
    this.twoFactorManageService.addSms(this.defaultCountry)
      .subscribe();
  }

  public deleted(): void {
    this._message.success('Deleted text message verification method');
    if(!this.twoFactorManageService.hasVerificationMethod(FsVerificationMethodType.Sms)) {
      this._dialogRef.close();
    }
  }

}
