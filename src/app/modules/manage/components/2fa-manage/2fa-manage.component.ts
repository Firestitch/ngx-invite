import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  Input,
  OnInit,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TwoFactorManageService } from '../../services';

import { ManageMethodsComponent } from '../manage-methods';


@Component({
  selector: 'fs-2fa-manage',
  templateUrl: './2fa-manage.component.html',
  styleUrls: ['./2fa-manage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TwoFactorManageService],
})
export class Fs2faManageComponent implements OnDestroy, OnInit {

  @Input() public accountVerify: () => Observable<any>;
  @Input() public defaultCountry: string;
  @Input() public verificationMethodsFetch: () => Observable<any[]>;
  @Input() public verificationMethodDelete: (verificationMethod: any) => Observable<any>;
  @Input() public verificationMethodCreate: (verificationMethod: any) => Observable<any>;
  @Input() public verificationMethodVerify: (verificationMethod: any) => Observable<any>;
  @Input() public verificationMethodResend: () => Observable<any>;

  public statuses;

  private _destroy$ = new Subject();

  constructor(
    private _cdRef: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _twoFactorManageService: TwoFactorManageService,
  ) {}

  public ngOnInit(): void {
    this._twoFactorManageService.registerVerificationMethodFetch(this.verificationMethodsFetch);
    this._twoFactorManageService.registerVerificationMethodDelete(this.verificationMethodDelete);
    this._twoFactorManageService.registerVerificationMethodCreate(this.verificationMethodCreate);
    this._twoFactorManageService.registerVerificationMethodVerify(this.verificationMethodVerify);
    this._twoFactorManageService.registerVerificationMethodResend(this.verificationMethodResend);
    this._twoFactorManageService.registerAccountVerify(this.accountVerify);


    this._twoFactorManageService.verificationMethods$
      .subscribe((verificationMethods) => {
        const types = {
          sms: 'Text Message',
          email: 'Email',
          app: 'Authenticator App',
        };

        this.statuses = Object.keys(
          verificationMethods.reduce((accum, verificationMethod) => {
            accum[verificationMethod.type] = true;

            return accum;
          }, {}),
        )
          .map((type) => {
            return types[type];
          });

        this._cdRef.markForCheck();
      });

    this._twoFactorManageService.verificationMethodFetch();
  }

  public manage() {
    const dialogRef = this._dialog.open(ManageMethodsComponent, {
      autoFocus: false,
      data: {
        defaultCountry: this.defaultCountry,
        twoFactorManageService: this._twoFactorManageService,
      },
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._cdRef.markForCheck();
      });
  }

  public reload(): void {
    this._twoFactorManageService.verificationMethodFetch();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }


}
