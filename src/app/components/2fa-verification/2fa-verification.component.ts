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

import { filter, takeUntil, tap } from 'rxjs/operators';

import { IFsVerificationMethod } from '../../interfaces/verification-method.interface';
import { Fs2FaVerificationMethodsComponent } from '../2fa-verification-methods/2fa-verification-methods.component';
import { Subject } from 'rxjs';
import { FS_2FA_VERIFICATION_PROVIDER } from '../../tokens/verification.token';
import { IFsVerificationProvider } from '../../interfaces/verification-provider.interface';
import { FsVerificationMethodType } from '../../enums/verification-method-type.enum';
import { Fs2FAVerificationCodeComponent } from '../2fa-verification-code/2fa-verification-code.component';


@Component({
  selector: 'fs-2fa-verification',
  templateUrl: './2fa-verification.component.html',
  styleUrls: [
    './2fa-verification.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Fs2FAVerificationComponent implements OnDestroy, AfterViewInit, OnInit {

  @ViewChild(Fs2FAVerificationCodeComponent)
  public verificationCodeComponent: Fs2FAVerificationCodeComponent;

  @Input()
  public method: IFsVerificationMethod;

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
    @Inject(FS_2FA_VERIFICATION_PROVIDER)
    public verificationProvider: IFsVerificationProvider,
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

  public verify() {
    this.verificationProvider
      .verify(this.code, this.trustedDevice)
      .subscribe((response) => {
        this.verified.emit(response);
      });
  };

  public ngAfterViewInit(): void {
    this.verificationCodeComponent.focus();    
  }

  public resend(): void {
    this.resendInProgress = true;
    this.code = '';

    this.verificationProvider
      .resend()
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
    this._dialog.open(
      Fs2FaVerificationMethodsComponent,
      {
        data: {
          method: this.method,
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
  }

}
