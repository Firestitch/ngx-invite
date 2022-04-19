import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { FsDialog } from '@firestitch/dialog';

import { filter, takeUntil } from 'rxjs/operators';

import { IFsVerificationMethod } from '../../../../interfaces/verification-method.interface';
import { Fs2faVerificationMethodsComponent } from '../2fa-verification-methods/2fa-verification-methods.component';
import { Observable, Subject } from 'rxjs';
import { FsVerificationMethodType } from '../../../../enums/verification-method-type.enum';
import { Fs2faVerificationCodeComponent } from '../2fa-verification-code/2fa-verification-code.component';


@Component({
  selector: 'fs-2fa-verification',
  templateUrl: './2fa-verification.component.html',
  styleUrls: [
    './2fa-verification.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Fs2faVerificationComponent implements OnDestroy, AfterViewInit, OnInit {

  @ViewChild(Fs2faVerificationCodeComponent)
  public verificationCodeComponent: Fs2faVerificationCodeComponent;

  @Input()
  public method: IFsVerificationMethod;

  @Input()
  public resend: () => Observable<void>;

  @Input()
  public getVerificationMethods: () => Observable<IFsVerificationMethod[]>;

  @Input()
  public selectVerificationMethod: (verificationMethod: IFsVerificationMethod) => Observable<IFsVerificationMethod>;

  @Output()
  public verified = new EventEmitter<unknown>();

  @Output()
  public codeChanged = new EventEmitter<unknown>();

  @Output()
  public codeCompleted = new EventEmitter<unknown>();

  public resendInProgress = false;
  public code = '';
  public trustedDevice = true;
  public FsVerificationMethodType = FsVerificationMethodType;

  private _destroy$ = new Subject<void>();

  constructor(
    private _cdRef: ChangeDetectorRef,
    private _dialog: FsDialog,
  ) {
  }

  public ngOnInit(): void {
    this.codeChanged
    .pipe(
      takeUntil(this._destroy$),
    )
    .subscribe((code: string) => {
      this.code = code;
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public ngAfterViewInit(): void {
    this.verificationCodeComponent.focus();    
  }

  public resendCode(): void {
    this.resendInProgress = true;
    this.code = '';

    this.resend()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.resendInProgress = false;   
        this.verificationCodeComponent.focus();  
        this._cdRef.markForCheck();
      })
  }

  public showVerificationMethods(): void {
    this.getVerificationMethods()
    .subscribe((verificationMethods) => {
      this._dialog.open(
        Fs2faVerificationMethodsComponent,
        {
          data: {
            method: this.method,
            verificationMethods,
            selectVerificationMethod: this.selectVerificationMethod,
          }
        }
      )
        .afterClosed()
        .pipe(
          filter((method) => !!method),
        )
        .subscribe((method) => {
          this.method = method;
          this.code = '';

          this._cdRef.markForCheck();

          setTimeout(() => {
            this.verificationCodeComponent.focus();
          });
        });
    });
  }

}
