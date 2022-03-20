import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Fs2faManageComponent } from '@firestitch/2fa';
import { guid } from '@firestitch/common';
import { FsMessage } from '@firestitch/message';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-manage-verifications',
  styleUrls: ['./manage-verifications.component.scss'],
  templateUrl: './manage-verifications.component.html',
})
export class ManageVerificationsComponent {

  @ViewChild(Fs2faManageComponent)
  public manageComponent: Fs2faManageComponent;

  private _createVerificationMethod;
  private _verificationMethods = [
    {
      id: 5,
      accountId: 2023,
      state: 'active',
      type: 'email',
      default: false,
      email: 'bob@email.com',
    },
    {
      id: 6,
      accountId: 2023,
      state: 'active',
      type: 'sms',
      phoneCode: 1,
      phoneCountry: 'CA',
      phoneNumber: 4165554444,
      default: true,
    },
    {
      id: 7,
      accountId: 2023,
      state: 'active',
      type: 'app',
    },
  ];

  constructor(
    private _message: FsMessage,
    private _dialog: MatDialog,
  ) {}

  public verificationMethodsFetch = (): Observable<any[]> => {
    return of(this._verificationMethods);
  };

  public verificationMethodDelete = (verificationMethod): Observable<any> => {
    this._verificationMethods = this._verificationMethods
    .filter((_verificationMethod) => {
      return _verificationMethod.id !== verificationMethod.id;
    });

    return of(true);
  };

  public verificationMethodCreate = (verificationMethod): Observable<any> => {
    this._createVerificationMethod = {
      ...verificationMethod,
      id: guid(),
    };

    return of({
      ...verificationMethod,
      qrCodeUrl: 'https://google.com',
    });
  };

  public verificationMethodVerify = (code): Observable<any> => {
    this._verificationMethods.push(this._createVerificationMethod);

    if(this._createVerificationMethod.default) {
      this._verificationMethods
      .filter((verificationMethod) => (verificationMethod.id !== this._createVerificationMethod.id))
      .forEach((verificationMethod) => {
        verificationMethod.default = false;
      });
    }

    return of(true);
  };

  public verificationMethodResend = (): Observable<any> => {
    return of(true);
  };

  public accountVerify = (): Observable<any> => {
    return of(true);
  };
}
