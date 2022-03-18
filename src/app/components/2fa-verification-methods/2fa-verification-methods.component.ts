import {
  ChangeDetectionStrategy,
  Component,
  Inject,
} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

import { FS_2FA_VERIFICATION_PROVIDER } from '../../tokens/verification.token';
import { FsVerificationMethodType } from '../../enums/verification-method-type.enum';
import { IFsVerificationProvider } from '../../interfaces/verification-provider.interface';
import { IFsVerificationMethod } from '../../interfaces/verification-method.interface';


@Component({
  templateUrl: './2fa-verification-methods.component.html',
  styleUrls: [
    './2fa-verification-methods.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Fs2FaVerificationMethodsComponent {

  public method: IFsVerificationMethod;
  public phone: string;
  public code: string;
  public methods$: Observable<Record<string, IFsVerificationMethod[]>>;
  public readonly verificationMethodType = FsVerificationMethodType;

  constructor(
    @Inject(FS_2FA_VERIFICATION_PROVIDER)
    private _verificationProvider: IFsVerificationProvider,
    @Inject(MAT_DIALOG_DATA)
    private _dialogData: any,
    private _dialogRef: MatDialogRef<Fs2FaVerificationMethodsComponent>,
  ) {
    this._setActiveMethod();
    this._initMethods();
  }

  public compareWith(o1, o2) {
    return o1 && o2 && o1.id === o2.id
  }

  public setVerificationMethod = () => {
    return this._verificationProvider
      .updateVerificationMethod(this.method.id)
      .pipe(
        tap((method: IFsVerificationMethod) => {
          this._dialogRef.close(method);
        })
      );
  };

  private _setActiveMethod(): void {
    this.method = this._dialogData?.method;
  }

  private _initMethods(): void {
    this.methods$ = this._verificationProvider
      .methods()
      .pipe(
        map((methods) => {
          return methods
            .reduce((acc, method) => {
              if (!acc[method.type]) {
                acc[method.type] = [];
              }

              acc[method.type].push(method);

              return acc;
            }, {});
        }),
        shareReplay(1),
      );
  }
}
