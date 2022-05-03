import { Injectable, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { VerificationMethodType } from '../../../enums/verification-method-type.enum';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

import { AppComponent } from '../components/app';
import { EmailComponent } from '../components/email';
import { NumberComponent } from '../components/number';


@Injectable()
export class TwoFactorManageService implements OnDestroy {

  private _destroy$ = new Subject();

  private _verificationMethodFetch: () => Observable<any[]>;
  private _verificationMethodCreate: (verificationMethod) => Observable<any>;
  private _verificationMethodDelete: (verificationMethod) => Observable<any>;
  private _verificationMethodVerify: (verificationMethod) => Observable<any>;
  private _verificationMethodResend: () => Observable<any>;
  private _accountVerify: () => Observable<any[]>;
  private _verificationMethods$ = new BehaviorSubject<any[]>([]);

  constructor(
    private _dialog: MatDialog,
  ) {}

  public get verificationMethods$() {
    return this._verificationMethods$
      .pipe(
        takeUntil(this._destroy$),
      );
  }
  
  public get verificationMethods() {
    return this._verificationMethods$.getValue();
  }

  public get hasVerificationMethods(): boolean {
    return !!this._verificationMethods$.getValue().length;
  }

  public get emailVerificationMethods() {
    return this.getVerificationMethods(VerificationMethodType.Email);
  }

  public get smsVerificationMethods() {
    return this.getVerificationMethods(VerificationMethodType.Sms);
  }

  public get appVerificationMethods() {
    return this.getVerificationMethods(VerificationMethodType.App);
  }
  
  public getVerificationMethods(type) {
    return this.verificationMethods
    .filter((verificationMethod) => {
      return verificationMethod.type === type;
    });
  }
  
  public hasVerificationMethod(type) {
    return this.verificationMethods
    .some((verificationMethod) => {
      return verificationMethod.type === type;
    });
  }

  public registerVerificationMethodResend(value) {
    this._verificationMethodResend = value;
  }

  public registerVerificationMethodFetch(value) {
    this._verificationMethodFetch = value;
  }

  public registerVerificationMethodDelete(value) {
    this._verificationMethodDelete = value;
  }

  public registerVerificationMethodCreate(value) {
    this._verificationMethodCreate = value;
  }

  public registerVerificationMethodVerify(value) {
    this._verificationMethodVerify = value;
  }

  public registerAccountVerify(value) {
    this._accountVerify = value;
  }

  public verificationMethodDelete(verificationMethod): Observable<any> {
    return this._verificationMethodDelete(verificationMethod)
      .pipe(
        tap(() => {
          this.verificationMethodFetch();
        }),
      );
  }

  public verificationMethodVerify(verificationMethod): Observable<any> {
    return this._verificationMethodVerify(verificationMethod)
      .pipe(
        tap(() => {
          this.verificationMethodFetch();
        }),
      );
  }

  public verificationMethodCreate(verificationMethod): Observable<any>  {
    return this._verificationMethodCreate(verificationMethod);
  }

  public verificationMethodResend(): Observable<any>  {
    return this._verificationMethodResend();
  }

  public verificationMethodFetch() {
    this._verificationMethodFetch()
      .subscribe((verificationMethods) => {
        this._verificationMethods$.next(verificationMethods);
      });
  }

  public accountVerify(): Observable<any> {
    return this._accountVerify ? this._accountVerify() : of(true);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public addSms(defaultCountry): Observable<any>{
    return this.accountVerify()
      .pipe(
        switchMap(() => this._dialog.open(NumberComponent, {
          data: {
            defaultCountry,
            twoFactorManageService: this,
          },
        })
          .afterClosed(),
        ),
        tap(() => {
          this.verificationMethodFetch();
        }),
        takeUntil(this._destroy$),
      );
  }

  public addEmail(): Observable<any>{
    return this.accountVerify()
      .pipe(
        switchMap(() => this._dialog.open(EmailComponent, {
          data: { twoFactorManageService: this },
        })
          .afterClosed(),
        ),
        tap(() => {
          this.verificationMethodFetch();
        }),
        takeUntil(this._destroy$),
      );
  }

  public addApp(): Observable<any>{
    return this.accountVerify()
      .pipe(
        switchMap(() => this._dialog.open(AppComponent, {
          data: { twoFactorManageService: this  },
        })
          .afterClosed(),
        ),
        tap(() => {
          this.verificationMethodFetch();
        }),
        takeUntil(this._destroy$),
      );
  }
}
